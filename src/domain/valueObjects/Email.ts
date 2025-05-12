import { ValueObject } from "../shared/ValueObject"

/**
 * Value Object para representar un email
 */
export class Email extends ValueObject<{ value: string }> {
  private constructor(value: string) {
    super({ value })
  }

  public static create(email: string): Email {
    if (!email) {
      throw new Error("Email cannot be empty")
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error("Email is not valid")
    }

    return new Email(email)
  }

  get value(): string {
    return this.props.value
  }
}
