import { CreateUtilityReadingCommand } from "../commands/create-utility-reading.command";
import { UtilityReading } from "../../domain/entities/utility-reading.entity";
import { IUtilityRepository } from "../../domain/repositories/utility.repository.interface";
import { UtilityService } from "../../domain/services/utility.service";

export class CreateUtilityReadingHandler {
  constructor(
    private readonly repository: IUtilityRepository,
    private readonly service: UtilityService
  ) {}

  async handle(command: CreateUtilityReadingCommand): Promise<UtilityReading> {
    const reading = UtilityReading.create(command);
    
    this.service.validateReading(reading);
    
    return this.repository.save(reading);
  }
}