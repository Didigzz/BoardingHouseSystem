/**
 * Domain Event Base Class
 * 
 * Domain events represent something meaningful that happened in the domain.
 * They are immutable and contain all the data related to the event.
 */

export interface DomainEventPayload<T = unknown> {
  eventType: string;
  data: T;
  occurredOn: Date;
  eventId: string;
}

export abstract class DomainEvent<T = unknown> {
  public readonly eventId: string;
  public readonly eventType: string;
  public readonly data: T;
  public readonly occurredOn: Date;

  constructor(eventType: string, data: T) {
    this.eventId = crypto.randomUUID();
    this.eventType = eventType;
    this.data = data;
    this.occurredOn = new Date();
  }

  /**
   * Get the event payload for serialization
   */
  toPayload(): DomainEventPayload<T> {
    return {
      eventId: this.eventId,
      eventType: this.eventType,
      data: this.data,
      occurredOn: this.occurredOn,
    };
  }

  /**
   * Get the event type
   */
  getType(): string {
    return this.eventType;
  }

  /**
   * Get the event data
   */
  getData(): T {
    return this.data;
  }

  /**
   * Get when the event occurred
   */
  getOccurredOn(): Date {
    return this.occurredOn;
  }
}
