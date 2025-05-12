export interface IUserContext {
  /**
   * Obtiene el ID del usuario actual
   */
  getCurrentUserId(): string

  /**
   * Obtiene el nombre del usuario actual
   */
  getCurrentUserName(): string

  /**
   * Verifica si el usuario actual tiene un rol específico
   */
  hasRole(role: string): boolean

  /**
   * Verifica si el usuario actual tiene un permiso específico
   */
  hasPermission(permission: string): boolean

  /**
   * Obtiene los tenants (tiendas) a los que el usuario tiene acceso
   */
  getAccessibleTenants(): string[]

  /**
   * Verifica si el usuario tiene acceso a un tenant específico
   */
  canAccessTenant(tenantId: string): boolean
}
