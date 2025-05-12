import { AggregateRoot } from "../../shared/AggregateRoot"
import type { UserId } from "./UserId"
import type { Email } from "../../valueObjects/Email"
import type { UserRole } from "./UserRole"
import { UserStatus } from "./UserStatus"
import type { TenantId } from "../tenant/TenantId"

/**
 * Entidad Usuario
 * Representa un usuario del sistema con roles y permisos
 */
export class User extends AggregateRoot<UserId> {
  private _name: string
  private _email: Email
  private _roles: Set<UserRole>
  private _status: UserStatus
  private _tenantAccess: Map<string, Set<string>> // TenantId -> Set de permisos
  private _lastLogin: Date | null
  private _createdAt: Date
  private _updatedAt: Date

  constructor(id: UserId, name: string, email: Email) {
    super(id)
    this._name = name
    this._email = email
    this._roles = new Set<UserRole>()
    this._status = UserStatus.ACTIVE
    this._tenantAccess = new Map<string, Set<string>>()
    this._lastLogin = null
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  // Getters
  get name(): string {
    return this._name
  }
  get email(): Email {
    return this._email
  }
  get status(): UserStatus {
    return this._status
  }
  get lastLogin(): Date | null {
    return this._lastLogin
  }
  get createdAt(): Date {
    return this._createdAt
  }
  get updatedAt(): Date {
    return this._updatedAt
  }

  // Métodos de roles
  public addRole(role: UserRole): void {
    this._roles.add(role)
    this._updatedAt = new Date()
  }

  public removeRole(role: UserRole): void {
    this._roles.delete(role)
    this._updatedAt = new Date()
  }

  public hasRole(role: UserRole): boolean {
    return this._roles.has(role)
  }

  public getRoles(): UserRole[] {
    return Array.from(this._roles)
  }

  // Métodos de acceso a tenants
  public grantTenantAccess(tenantId: TenantId, permissions: string[] = []): void {
    const tenantIdStr = tenantId.toString()
    if (!this._tenantAccess.has(tenantIdStr)) {
      this._tenantAccess.set(tenantIdStr, new Set<string>())
    }

    const tenantPermissions = this._tenantAccess.get(tenantIdStr)!
    permissions.forEach((permission) => tenantPermissions.add(permission))

    this._updatedAt = new Date()
  }

  public revokeTenantAccess(tenantId: TenantId): void {
    this._tenantAccess.delete(tenantId.toString())
    this._updatedAt = new Date()
  }

  public hasTenantAccess(tenantId: TenantId): boolean {
    return this._tenantAccess.has(tenantId.toString())
  }

  public hasTenantPermission(tenantId: TenantId, permission: string): boolean {
    const tenantIdStr = tenantId.toString()
    if (!this._tenantAccess.has(tenantIdStr)) {
      return false
    }

    return this._tenantAccess.get(tenantIdStr)!.has(permission)
  }

  public getAccessibleTenants(): string[] {
    return Array.from(this._tenantAccess.keys())
  }

  // Otros métodos
  public updateProfile(name: string, email: Email): void {
    this._name = name
    this._email = email
    this._updatedAt = new Date()
  }

  public activate(): void {
    this._status = UserStatus.ACTIVE
    this._updatedAt = new Date()
  }

  public deactivate(): void {
    this._status = UserStatus.INACTIVE
    this._updatedAt = new Date()
  }

  public recordLogin(): void {
    this._lastLogin = new Date()
  }
}
