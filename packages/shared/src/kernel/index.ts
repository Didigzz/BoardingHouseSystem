/**
 * Kernel Package - Core DDD Building Blocks
 *
 * This package provides the foundational classes and interfaces
 * for Domain-Driven Design implementation in BHMS.
 */

// Domain layer exports
export { Entity } from "./domain/entity";
export type { EntityProps } from "./domain/entity";

export { AggregateRoot } from "./domain/aggregate-root";

export { ValueObject } from "./domain/value-object";

// Events layer exports
export { DomainEvent } from "./events/domain-event";
export type { DomainEventPayload } from "./events/domain-event";
