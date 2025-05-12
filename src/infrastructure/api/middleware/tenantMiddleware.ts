import type { NextApiRequest, NextApiResponse } from "next"
import type { ITenantProvider } from "../../../domain/shared/interfaces/ITenantProvider"
import type { ITenantRepository } from "../../../domain/repositories/ITenantRepository"
import { TenantId } from "../../../domain/entities/tenant/TenantId"

/**
 * Middleware para resolver y validar el tenant en cada solicitud
 */
export function tenantMiddleware(tenantRepository: ITenantRepository, tenantProvider: ITenantProvider) {
  return async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      // Obtener el tenant ID de la solicitud (header, subdomain, query param, etc.)
      const tenantId = extractTenantId(req)

      if (!tenantId) {
        return res.status(400).json({ error: "Tenant ID is required" })
      }

      // Verificar que el tenant existe y está activo
      const tenant = await tenantRepository.getById(TenantId.create(tenantId))

      if (!tenant) {
        return res.status(404).json({ error: "Tenant not found" })
      }

      if (tenant.status !== "ACTIVE") {
        return res.status(403).json({ error: "Tenant is not active" })
      }

      // Establecer el tenant en el contexto para esta solicitud
      setTenantContext(req, tenantId, tenant.name)

      next()
    } catch (error) {
      console.error("Tenant middleware error:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  }
}

/**
 * Extrae el ID del tenant de la solicitud
 */
function extractTenantId(req: NextApiRequest): string | null {
  // Opción 1: Desde un header personalizado
  const tenantHeader = req.headers["x-tenant-id"]
  if (tenantHeader) {
    return Array.isArray(tenantHeader) ? tenantHeader[0] : tenantHeader
  }

  // Opción 2: Desde un parámetro de consulta
  if (req.query.tenantId) {
    return Array.isArray(req.query.tenantId) ? req.query.tenantId[0] : req.query.tenantId
  }

  // Opción 3: Desde un subdominio (ejemplo: tienda1.tigo-crm.com)
  const host = req.headers.host || ""
  const subdomain = host.split(".")[0]
  if (subdomain && subdomain !== "www" && !subdomain.includes("localhost")) {
    return subdomain
  }

  return null
}

/**
 * Establece el contexto del tenant para la solicitud actual
 */
function setTenantContext(req: NextApiRequest, tenantId: string, tenantName: string): void {
  // Añadir información del tenant al objeto de solicitud para uso posterior
  ;(req as any).tenantContext = {
    tenantId,
    tenantName,
  }
}
