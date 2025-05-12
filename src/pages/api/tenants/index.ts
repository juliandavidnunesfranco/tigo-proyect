import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
import { PrismaTenantRepository } from "../../../infrastructure/persistence/prisma/repositories/PrismaTenantRepository"
import { CreateTenantService } from "../../../application/services/tenant/CreateTenantService"
import { SimpleEventDispatcher } from "../../../infrastructure/events/SimpleEventDispatcher"
import { authMiddleware } from "../../../infrastructure/api/middleware/authMiddleware"
import { UserRole } from "../../../domain/entities/user/UserRole"

// Inicializar Prisma
const prisma = new PrismaClient()

// Inicializar repositorios y servicios
const tenantRepository = new PrismaTenantRepository(prisma)
const eventDispatcher = new SimpleEventDispatcher()
const createTenantService = new CreateTenantService(tenantRepository, eventDispatcher)

/**
 * API endpoint para gestionar tenants
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Solo permitir acceso a administradores del sistema
  const authMiddlewareHandler = authMiddleware(null as any, [UserRole.SYSTEM_ADMIN])

  try {
    await new Promise((resolve, reject) => {
      authMiddlewareHandler(req, res, () => resolve(true))
    })
  } catch (error) {
    // El middleware ya envió la respuesta de error
    return
  }

  // Manejar diferentes métodos HTTP
  switch (req.method) {
    case "GET":
      return handleGetTenants(req, res)
    case "POST":
      return handleCreateTenant(req, res)
    default:
      return res.status(405).json({ error: "Method not allowed" })
  }
}

/**
 * Maneja la solicitud GET para obtener todos los tenants
 */
async function handleGetTenants(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tenants = await tenantRepository.getAll()

    // Mapear a DTOs para la respuesta
    const tenantDTOs = tenants.map((tenant) => ({
      id: tenant.id.toString(),
      name: tenant.name,
      code: tenant.code,
      address: tenant.address,
      city: tenant.city,
      region: tenant.region,
      status: tenant.status,
      features: tenant.getFeatures(),
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }))

    return res.status(200).json(tenantDTOs)
  } catch (error) {
    console.error("Error getting tenants:", error)
    return res.status(500).json({ error: "Failed to get tenants" })
  }
}

/**
 * Maneja la solicitud POST para crear un nuevo tenant
 */
async function handleCreateTenant(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, code, address, city, region, features } = req.body

    // Validar datos requeridos
    if (!name || !code || !address || !city || !region) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    // Crear tenant usando el servicio de aplicación
    const tenantDTO = await createTenantService.execute({
      name,
      code,
      address,
      city,
      region,
      features: features || [],
    })

    return res.status(201).json(tenantDTO)
  } catch (error) {
    console.error("Error creating tenant:", error)

    if (error.message?.includes("already exists")) {
      return res.status(409).json({ error: error.message })
    }

    return res.status(500).json({ error: "Failed to create tenant" })
  }
}
