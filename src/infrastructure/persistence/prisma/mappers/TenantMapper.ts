import type { Tenant as PrismaTenant, TenantFeature } from "@prisma/client"
import { Tenant } from "../../../../domain/entities/tenant/Tenant"
import { TenantId } from "../../../../domain/entities/tenant/TenantId"
import type { TenantStatus } from "../../../../domain/entities/tenant/TenantStatus"

/**
 * Mapper para convertir entre entidad de dominio Tenant y modelo de Prisma
 */
export class TenantMapper {
  /**
   * Convierte un registro de Prisma a una entidad de dominio
   */
  public static toDomain(record: PrismaTenant & { features: TenantFeature[] }): Tenant {
    const tenantId = TenantId.create(record.id)

    // Recrear la entidad de dominio
    const tenant = new Tenant(tenantId, record.name, record.code, record.address, record.city, record.region)

    // Restaurar el estado y las fechas
    Object.assign(tenant, {
      _status: record.status as TenantStatus,
      _createdAt: record.createdAt,
      _updatedAt: record.updatedAt,
    })

    // Agregar características
    record.features.forEach((feature) => {
      tenant.addFeature(feature.name)
    })

    // Limpiar eventos para evitar publicar eventos históricos
    tenant.clearEvents()

    return tenant
  }

  /**
   * Convierte una entidad de dominio a un objeto para persistencia
   */
  public static toPersistence(tenant: Tenant): {
    id: string
    code: string
    name: string
    address: string
    city: string
    region: string
    status: TenantStatus
    features: string[]
    createdAt: Date
    updatedAt: Date
  } {
    return {
      id: tenant.id.toString(),
      code: tenant.code,
      name: tenant.name,
      address: tenant.address,
      city: tenant.city,
      region: tenant.region,
      status: tenant.status,
      features: tenant.getFeatures(),
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }
  }
}
