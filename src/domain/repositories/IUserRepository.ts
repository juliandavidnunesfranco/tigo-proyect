import type { User } from "../entities/user/User"
import type { UserId } from "../entities/user/UserId"
import type { Email } from "../valueObjects/Email"
import type { TenantId } from "../entities/tenant/TenantId"
import type { UserRole } from "../entities/user/UserRole"

/**
 * Interfaz para el repositorio de Usuarios
 */
export interface IUserRepository {
  getById(id: UserId): Promise<User | null>
  getByEmail(email: Email): Promise<User | null>
  getByTenant(tenantId: TenantId): Promise<User[]>
  getByRole(role: UserRole): Promise<User[]>
  getByTenantAndRole(tenantId: TenantId, role: UserRole): Promise<User[]>
  save(user: User): Promise<void>
  delete(id: UserId): Promise<void>
}
