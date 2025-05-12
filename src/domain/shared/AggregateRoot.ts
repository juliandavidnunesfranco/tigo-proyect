import { Entity } from "./Entity"
import type { DomainEvent } from "./DomainEvent"
import type { UniqueEntityID } from "./UniqueEntityID"

/**
 * Clase base para todos los Aggregate Roots en el dominio
 */
export abstract class AggregateRoot<T extends UniqueEntityID> extends Entity<T> {
  private _domainEvents: DomainEvent[] = []

  get domainEvents(): DomainEvent[] {
    return this._domainEvents
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent)
  }

  public clearEvents(): void {
    this._domainEvents = []
  }
}
