/**
 * Base Entity class for all domain entities
 * Provides identity and equality comparison
 */
export abstract class Entity<TProps> {
  protected readonly _id: string;
  protected props!: TProps;

  constructor(id: string, props?: TProps) {
    this._id = id;
    if (props) {
      this.props = props;
    }
  }

  get id(): string {
    return this._id;
  }

  public equals(entity?: Entity<TProps>): boolean {
    if (entity === null || entity === undefined) {
      return false;
    }
    if (this === entity) {
      return true;
    }
    return this._id === entity._id;
  }
}