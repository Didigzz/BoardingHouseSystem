import { Entity } from './entity';

/**
 * Base Aggregate Root class
 * Aggregate roots are entities that can contain other entities
 * They maintain invariants and publish domain events
 */
export abstract class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: any[] = [];

  get domainEvents(): any[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: any): void {
    this._domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }
}