/**
 * Base Domain Event class
 * Domain events represent something that happened in the domain
 */
export abstract class DomainEvent {
  public readonly occurredOn: Date;

  constructor() {
    this.occurredOn = new Date();
  }
}