import { Entity, EntityProps } from "./entity";
import { DomainEvent } from "../events/domain-event";

/**
 * Aggregate Root Base Class
 *
 * An aggregate root is a special entity that maintains the consistency
 * of all entities and value objects within its boundary.
 * It is the entry point for all operations on the aggregate.
 *
 * Key responsibilities:
 * - Maintain invariant consistency
 * - Collect and clear domain events
 * - Control access to child entities
 */

export abstract class AggregateRoot<
  TProps extends EntityProps = EntityProps,
> extends Entity<TProps> {
  private _domainEvents: DomainEvent[] = [];

  constructor(id: string, props: TProps) {
    super(id, props);
  }

  /**
   * Get all uncommitted domain events
   */
  get domainEvents(): DomainEvent[] {
    return [...this._domainEvents];
  }

  /**
   * Get the number of uncommitted domain events
   */
  get uncommittedEventsCount(): number {
    return this._domainEvents.length;
  }

  /**
   * Check if there are uncommitted domain events
   */
  hasUncommittedEvents(): boolean {
    return this._domainEvents.length > 0;
  }

  /**
   * Add a domain event to the aggregate
   * Domain events are automatically collected when raised
   */
  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  /**
   * Raise a domain event
   * This is the preferred way to emit events from aggregates
   */
  protected raise(event: DomainEvent): void {
    this.addDomainEvent(event);
  }

  /**
   * Get and clear all uncommitted domain events
   * Call this after persisting the aggregate to get events for publishing
   */
  pullUncommittedEvents(): DomainEvent[] {
    const events = this._domainEvents;
    this._domainEvents = [];
    return events;
  }

  /**
   * Clear all uncommitted domain events
   * Use this after events have been published
   */
  clearUncommittedEvents(): void {
    this._domainEvents = [];
  }

  /**
   * Load domain events from history (for event sourcing)
   */
  loadFromHistory(events: DomainEvent[]): void {
    this._domainEvents = [...events];
  }

  /**
   * Validate aggregate state
   * Override this method to add custom validation logic
   */
  validate(): boolean {
    if (!super.validate()) {
      return false;
    }

    // Add aggregate-specific validation if needed
    return true;
  }
}
