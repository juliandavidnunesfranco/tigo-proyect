import { UniqueEntityID } from "../../shared/UniqueEntityID"

/**
 * Value Object para el ID de un User
 */
export class UserId extends UniqueEntityID {
  private constructor(private readonly value: string) {
    super(value)
  }

  public static create(id: string): UserId {
    if (!id || id.trim() === "") {
      throw new Error("UserId cannot be empty")
    }
    return new UserId(id)
  }

  toString(): string {
    return this.value
  }
}
