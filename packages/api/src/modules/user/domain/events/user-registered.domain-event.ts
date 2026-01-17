import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface UserRegisteredEventData {
  userId: string;
  email: string;
  name: string;
  role: string;
  registeredAt: Date;
}

export class UserRegisteredDomainEvent extends DomainEvent<UserRegisteredEventData> {
  constructor(data: UserRegisteredEventData) {
    super("UserRegistered", data);
  }

  static create(data: UserRegisteredEventData): UserRegisteredDomainEvent {
    return new UserRegisteredDomainEvent(data);
  }
}