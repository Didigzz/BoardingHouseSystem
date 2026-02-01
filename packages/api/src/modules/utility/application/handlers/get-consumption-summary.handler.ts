import { GetConsumptionSummaryQuery } from "../queries/get-consumption-summary.query";
import { UtilityService } from "../../domain/services/utility.service";

export class GetConsumptionSummaryHandler {
  constructor(private readonly service: UtilityService) {}

  async handle(query: GetConsumptionSummaryQuery) {
    return this.service.getConsumptionSummary(
      query.roomId,
      query.type,
      query.months
    );
  }
}