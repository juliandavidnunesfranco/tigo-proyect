import type { Tenant } from "../entities/tenant/Tenant"
import type { TenantId } from "../entities/tenant/TenantId"

/**
 * Interfaz para el repositorio de Tenants
 */
export interface ITenantRepository {
  getById(id: TenantId): Promise<Tenant | null>
  getByCode(code: string): Promise<Tenant | null>
  getAll(): Promise<Tenant[]>
  getAllActive(): Promise<Tenant[]>
  save(tenant: Tenant): Promise<void>
  delete(id: TenantId): Promise<void>
}
