import type { PrismaClient } from "@prisma/client"
import type { ITenantRepository } from "../../../../domain/repositories/ITenantRepository"
import type { Tenant } from "../../../../domain/entities/tenant/Tenant"
import type { TenantId } from "../../../../domain/entities/tenant/TenantId"
import { TenantStatus } from "../../../../domain/entities/tenant/TenantStatus"
import { TenantMapper } from "../mappers/TenantMapper"

/**
 * Implementación del repositorio de Tenants usando Prisma ORM
 */
export class PrismaTenantRepository implements ITenantRepository {
  constructor(private prisma: PrismaClient) {}

  async getById(id: TenantId): Promise<Tenant | null> {
    const tenantRecord = await this.prisma.tenant.findUnique({
      where: { id: id.toString() },
      include: { features: true },
    })

    if (!tenantRecord) {
      return null
    }

    return TenantMapper.toDomain(tenantRecord)
  }

  async getByCode(code: string): Promise<Tenant | null> {
    const tenantRecord = await this.prisma.tenant.findUnique({
      where: { code },
      include: { features: true },
    })

    if (!tenantRecord) {
      return null
    }

    return TenantMapper.toDomain(tenantRecord)
  }

  async getAll(): Promise<Tenant[]> {
    const tenantRecords = await this.prisma.tenant.findMany({
      include: { features: true },
    })

    return tenantRecords.map((record) => TenantMapper.toDomain(record))
  }

  async getAllActive(): Promise<Tenant[]> {
    const tenantRecords = await this.prisma.tenant.findMany({
      where: { status: TenantStatus.ACTIVE },
      include: { features: true },
    })

    return tenantRecords.map((record) => TenantMapper.toDomain(record))
  }

  async save(tenant: Tenant): Promise<void> {
    const exists = await this.prisma.tenant.findUnique({
      where: { id: tenant.id.toString() },
    })

    const data = TenantMapper.toPersistence(tenant)

    if (exists) {
      // Actualizar tenant existente
      await this.prisma.tenant.update({
        where: { id: tenant.id.toString() },
        data: {
          name: data.name,
          address: data.address,
          city: data.city,
          region: data.region,
          status: data.status,
          updatedAt: data.updatedAt,
          features: {
            deleteMany: {},
            createMany: {
              data: data.features.map((feature) => ({ name: feature })),
            },
          },
        },
      })
    } else {
      // Crear nuevo tenant
      await this.prisma.tenant.create({
        data: {
          id: data.id,
          code: data.code,
          name: data.name,
          address: data.address,
          city: data.city,
          region: data.region,
          status: data.status,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          features: {
            createMany: {
              data: data.features.map((feature) => ({ name: feature })),
            },
          },
        },
      })
    }
  }

  async delete(id: TenantId): Promise<void> {
    await this.prisma.tenant.delete({
      where: { id: id.toString() },
    })
  }
}
