import type { UniqueEntityID } from "./UniqueEntityID"

/**
 * Clase base para todas las entidades del dominio
 */
export abstract class Entity<T extends UniqueEntityID> {
  protected readonly _id: T

  constructor(id: T) {
    this._id = id
  }

  get id(): T {
    return this._id
  }

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false
    }

    if (this === entity) {
      return true
    }

    return this._id.equals(entity._id)
  }
}
