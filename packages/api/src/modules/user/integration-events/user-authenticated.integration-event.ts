export interface UserAuthenticatedIntegrationEventData {
  userId: string;
  email: string;
  authenticatedAt: Date;
}

export class UserAuthenticatedIntegrationEvent {
  readonly type = "UserAuthenticated";
  readonly data: UserAuthenticatedIntegrationEventData;

  constructor(data: UserAuthenticatedIntegrationEventData) {
    this.data = data;
  }

  static create(data: UserAuthenticatedIntegrationEventData): UserAuthenticatedIntegrationEvent {
    return new UserAuthenticatedIntegrationEvent(data);
  }

  toJSON() {
    return {
      type: this.type,
      data: this.data,
    };
  }
}