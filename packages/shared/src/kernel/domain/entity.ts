/**
 * Entity Base Class
 * 
 * Entities are objects that have a distinct identity that runs through
 * time and different states. They are defined by their identity, not their attributes.
 */

export interface EntityProps {
  id: string;
  [key: string]: unknown;
}

export abstract class Entity<TProps extends EntityProps = EntityProps> {
  protected readonly _id: string;
  protected props: TProps;

  constructor(id: string, props: TProps) {
    this._id = id;
    this.props = props;
  }

  /**
   * Get the entity's unique identifier
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get all entity properties
   */
  getProps(): TProps {
    return { ...this.props };
  }

  /**
   * Get a specific property
   */
  getProp<K extends keyof TProps>(key: K): TProps[K] {
    return this.props[key];
  }

  /**
   * Check if two entities are equal based on their identity
   */
  equals(entity?: Entity<TProps>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }

    if (this === entity) {
      return true;
    }

    if (!(entity instanceof Entity)) {
      return false;
    }

    return this._id === entity.id;
  }

  /**
   * Convert entity to plain object
   */
  toObject(): TProps & { id: string } {
    const props = { ...this.props };
    return Object.assign(props, { id: this._id });
  }

  /**
   * Validate entity state
   * Override this method to add custom validation logic
   */
  validate(): boolean {
    return !!this._id;
  }
}
