import { DomainEvent } from "../../../../shared/kernel/events/domain-event";

export interface UtilityReadingRecordedEventData {
  readingId: string;
  roomId: string;
  type: string;
  consumption: number;
  cost: number;
  readingDate: Date;
}

export class UtilityReadingRecordedDomainEvent extends DomainEvent<UtilityReadingRecordedEventData> {
  constructor(data: UtilityReadingRecordedEventData) {
    super("UtilityReadingRecorded", data);
  }

  static create(data: UtilityReadingRecordedEventData): UtilityReadingRecordedDomainEvent {
    return new UtilityReadingRecordedDomainEvent(data);
  }
}