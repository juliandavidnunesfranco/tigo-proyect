import type { TenantStatus } from "../../../domain/entities/tenant/TenantStatus"

/**
 * DTO para la respuesta con información de un tenant
 */
export interface TenantResponseDTO {
  id: string
  name: string
  code: string
  address: string
  city: string
  region: string
  status: TenantStatus
  features: string[]
  createdAt: Date
  updatedAt: Date
}
