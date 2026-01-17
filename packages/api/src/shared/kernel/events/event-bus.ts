import { IEventBus } from '../infrastructure/messaging/event-bus.interface';

export class EventBus implements IEventBus {
  private static instance: EventBus;
  private handlers: Map<string, Set<(event: any) => Promise<void>>>;

  private constructor() {
    this.handlers = new Map();
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  async publish(event: any): Promise<void> {
    const eventType = event.type;
    const handlers = this.handlers.get(eventType);
    
    if (handlers) {
      await Promise.all(
        Array.from(handlers).map(handler => handler(event))
      );
    }
  }

  subscribe(eventType: string, handler: (event: any) => Promise<void>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  unsubscribe(eventType: string, handler: (event: any) => void): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
    }
  }
}

export const eventBus = new EventBus();