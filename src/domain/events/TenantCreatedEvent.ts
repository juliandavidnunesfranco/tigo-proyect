import { DomainEvent } from "../shared/DomainEvent"

/**
 * Evento de dominio para la creación de un nuevo tenant
 */
export class TenantCreatedEvent extends DomainEvent {
  constructor(
    public readonly tenantId: string,
    public readonly tenantName: string,
    public readonly tenantCode: string,
  ) {
    super()
  }

  eventName(): string {
    return "tenant.created"
  }
}
