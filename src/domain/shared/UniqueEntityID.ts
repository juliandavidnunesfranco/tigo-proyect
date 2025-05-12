import { ValueObject } from "./ValueObject"

/**
 * Clase base para IDs de entidades
 */
export abstract class UniqueEntityID extends ValueObject<any> {
  abstract toString(): string

  public equals(id?: UniqueEntityID): boolean {
    if (id === null || id === undefined) {
      return false
    }

    if (!(id instanceof this.constructor)) {
      return false
    }

    return this.toString() === id.toString()
  }
}
