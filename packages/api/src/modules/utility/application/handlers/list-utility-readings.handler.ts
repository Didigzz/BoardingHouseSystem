import { ListUtilityReadingsQuery } from "../queries/list-utility-readings.query";
import { IUtilityRepository } from "../../domain/repositories/utility.repository.interface";

export class ListUtilityReadingsHandler {
  constructor(private readonly repository: IUtilityRepository) {}

  async handle(query?: ListUtilityReadingsQuery) {
    return this.repository.findAll(query);
  }
}