import type { DomainEvent } from "../DomainEvent"

/**
 * Interfaz para el despachador de eventos de dominio
 */
export interface IEventDispatcher {
  /**
   * Registra un manejador para un tipo de evento específico
   */
  register(eventName: string, handler: (event: DomainEvent) => void): void

  /**
   * Despacha un evento a todos los manejadores registrados
   */
  dispatch(event: DomainEvent): void
}
