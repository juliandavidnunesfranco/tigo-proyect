import type { ITenantRepository } from "../../../domain/repositories/ITenantRepository"
import { Tenant } from "../../../domain/entities/tenant/Tenant"
import { TenantId } from "../../../domain/entities/tenant/TenantId"
import type { IEventDispatcher } from "../../../domain/shared/interfaces/IEventDispatcher"
import type { CreateTenantDTO } from "../../dtos/tenant/CreateTenantDTO"
import type { TenantResponseDTO } from "../../dtos/tenant/TenantResponseDTO"

/**
 * Servicio de aplicación para crear un nuevo tenant (tienda)
 */
export class CreateTenantService {
  constructor(
    private tenantRepository: ITenantRepository,
    private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(dto: CreateTenantDTO): Promise<TenantResponseDTO> {
    // Verificar si ya existe un tenant con el mismo código
    const existingTenant = await this.tenantRepository.getByCode(dto.code)
    if (existingTenant) {
      throw new Error(`Tenant with code ${dto.code} already exists`)
    }

    // Crear nuevo tenant
    const tenantId = TenantId.create(dto.id || this.generateId())
    const tenant = new Tenant(tenantId, dto.name, dto.code, dto.address, dto.city, dto.region)

    // Agregar características si se proporcionan
    if (dto.features && dto.features.length > 0) {
      dto.features.forEach((feature) => tenant.addFeature(feature))
    }

    // Guardar el tenant
    await this.tenantRepository.save(tenant)

    // Publicar eventos de dominio
    tenant.domainEvents.forEach((event) => {
      this.eventDispatcher.dispatch(event)
    })
    tenant.clearEvents()

    // Retornar DTO de respuesta
    return {
      id: tenant.id.toString(),
      name: tenant.name,
      code: tenant.code,
      address: tenant.address,
      city: tenant.city,
      region: tenant.region,
      status: tenant.status,
      features: tenant.getFeatures(),
      createdAt: tenant.createdAt,
      updatedAt: tenant.updatedAt,
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }
}
