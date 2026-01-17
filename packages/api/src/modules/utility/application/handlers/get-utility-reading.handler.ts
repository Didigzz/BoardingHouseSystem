import { GetUtilityReadingQuery } from "../queries/get-utility-reading.query";
import { IUtilityRepository } from "../../domain/repositories/utility.repository.interface";

export class GetUtilityReadingHandler {
  constructor(private readonly repository: IUtilityRepository) {}

  async handle(query: GetUtilityReadingQuery) {
    const reading = await this.repository.findById(query.id);
    
    if (!reading) {
      throw new Error("Utility reading not found");
    }
    
    return reading;
  }
}