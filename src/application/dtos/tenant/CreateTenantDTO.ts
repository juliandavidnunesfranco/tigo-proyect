export interface CreateTenantDTO {
  id?: string
  name: string
  code: string
  address: string
  city: string
  region: string
  features?: string[]
}
