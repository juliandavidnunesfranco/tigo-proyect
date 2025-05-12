export interface ITenantProvider {
  /**
   * Obtiene el ID del tenant actual
   */
  getCurrentTenantId(): string

  /**
   * Obtiene el nombre del tenant actual
   */
  getCurrentTenantName(): string

  /**
   * Verifica si el tenant actual tiene acceso a una funcionalidad específica
   */
  hasTenantFeature(featureName: string): boolean

  /**
   * Obtiene la configuración específica del tenant
   */
  getTenantConfig<T>(key: string): T | null
}
