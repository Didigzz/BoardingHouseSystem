import { GetLatestReadingQuery } from "../queries/get-latest-reading.query";
import { IUtilityRepository } from "../../domain/repositories/utility.repository.interface";

export class GetLatestReadingHandler {
  constructor(private readonly repository: IUtilityRepository) {}

  async handle(query: GetLatestReadingQuery) {
    return this.repository.findLatestByRoomAndType(query.roomId, query.type);
  }
}