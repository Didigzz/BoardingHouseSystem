/**
 * Base Domain Event class
 * Domain events represent something that happened in the domain
 */
export abstract class DomainEvent<TData = unknown> {
  public readonly occurredOn: Date;
  public readonly eventName: string;
  public readonly data: TData;

  constructor(eventName: string, data: TData) {
    this.eventName = eventName;
    this.data = data;
    this.occurredOn = new Date();
  }
}
