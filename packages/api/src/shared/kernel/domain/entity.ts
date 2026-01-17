/**
 * Base Entity class for all domain entities
 * Provides identity and equality comparison
 */
export abstract class Entity<T> {
  protected readonly _id: string;

  constructor(id: string) {
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  public equals(entity?: Entity<T>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this._id === entity._id;
  }
}