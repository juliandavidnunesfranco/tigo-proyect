import type { DomainEvent } from "../../domain/shared/DomainEvent"
import type { IEventDispatcher } from "../../domain/shared/interfaces/IEventDispatcher"

type EventHandler = (event: DomainEvent) => void

/**
 * Implementación simple de un despachador de eventos
 */
export class SimpleEventDispatcher implements IEventDispatcher {
  private handlers: Map<string, EventHandler[]> = new Map()

  /**
   * Registra un manejador para un tipo de evento específico
   */
  register(eventName: string, handler: EventHandler): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, [])
    }

    this.handlers.get(eventName)!.push(handler)
  }

  /**
   * Despacha un evento a todos los manejadores registrados
   */
  dispatch(event: DomainEvent): void {
    const eventName = event.eventName()

    if (this.handlers.has(eventName)) {
      const handlers = this.handlers.get(eventName)!

      for (const handler of handlers) {
        try {
          handler(event)
        } catch (error) {
          console.error(`Error handling event ${eventName}:`, error)
        }
      }
    }

    // También despachamos a manejadores genéricos que escuchan todos los eventos
    if (this.handlers.has("*")) {
      const handlers = this.handlers.get("*")!

      for (const handler of handlers) {
        try {
          handler(event)
        } catch (error) {
          console.error(`Error handling event ${eventName} with wildcard handler:`, error)
        }
      }
    }
  }
}
