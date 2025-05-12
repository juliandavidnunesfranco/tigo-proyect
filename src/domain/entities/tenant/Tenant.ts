import { AggregateRoot } from "../../shared/AggregateRoot"
import type { TenantId } from "./TenantId"
import { TenantStatus } from "./TenantStatus"
import { TenantCreatedEvent } from "../../events/TenantCreatedEvent"

/**
 * Entidad Tenant (Tienda)
 * Representa una tienda de TIGO en el sistema
 */
export class Tenant extends AggregateRoot<TenantId> {
  private _name: string
  private _code: string
  private _address: string
  private _city: string
  private _region: string
  private _status: TenantStatus
  private _features: Set<string>
  private _createdAt: Date
  private _updatedAt: Date

  constructor(id: TenantId, name: string, code: string, address: string, city: string, region: string) {
    super(id)
    this._name = name
    this._code = code
    this._address = address
    this._city = city
    this._region = region
    this._status = TenantStatus.ACTIVE
    this._features = new Set<string>()
    this._createdAt = new Date()
    this._updatedAt = new Date()

    // Registrar evento de creación
    this.addDomainEvent(new TenantCreatedEvent(id.toString(), name, code))
  }

  // Getters
  get name(): string {
    return this._name
  }
  get code(): string {
    return this._code
  }
  get address(): string {
    return this._address
  }
  get city(): string {
    return this._city
  }
  get region(): string {
    return this._region
  }
  get status(): TenantStatus {
    return this._status
  }
  get createdAt(): Date {
    return this._createdAt
  }
  get updatedAt(): Date {
    return this._updatedAt
  }

  // Métodos de negocio
  public updateDetails(name: string, address: string, city: string, region: string): void {
    this._name = name
    this._address = address
    this._city = city
    this._region = region
    this._updatedAt = new Date()
  }

  public activate(): void {
    if (this._status !== TenantStatus.ACTIVE) {
      this._status = TenantStatus.ACTIVE
      this._updatedAt = new Date()
    }
  }

  public deactivate(): void {
    if (this._status !== TenantStatus.INACTIVE) {
      this._status = TenantStatus.INACTIVE
      this._updatedAt = new Date()
    }
  }

  public addFeature(feature: string): void {
    this._features.add(feature)
    this._updatedAt = new Date()
  }

  public removeFeature(feature: string): void {
    this._features.delete(feature)
    this._updatedAt = new Date()
  }

  public hasFeature(feature: string): boolean {
    return this._features.has(feature)
  }

  public getFeatures(): string[] {
    return Array.from(this._features)
  }
}
