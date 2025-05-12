import { ValueObject } from "../../shared/ValueObject"

/**
 * Value Object para el ID de un Tenant
 */
export class TenantId extends ValueObject<{ value: string }> {
  private constructor(value: string) {
    super({ value })
  }

  public static create(id: string): TenantId {
    if (!id || id.trim() === "") {
      throw new Error("TenantId cannot be empty")
    }
    return new TenantId(id)
  }

  toString(): string {
    return this.props.value
  }
}
