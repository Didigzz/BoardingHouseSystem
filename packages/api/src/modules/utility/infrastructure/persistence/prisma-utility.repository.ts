import { IUtilityRepository } from "../../domain/repositories/utility.repository.interface";
import { UtilityReading } from "../../domain/entities/utility-reading.entity";

export class PrismaUtilityRepository implements IUtilityRepository {
  constructor(private readonly db: any) {}

  async findById(id: string): Promise<UtilityReading | null> {
    const data = await this.db.utilityReading.findUnique({
      where: { id },
      include: { room: true },
    });
    
    return data ? UtilityReading.fromPrisma(data) : null;
  }

  async findByRoomId(roomId: string): Promise<UtilityReading[]> {
    const data = await this.db.utilityReading.findMany({
      where: { roomId },
      orderBy: { readingDate: "desc" },
    });
    
    return data.map((item: any) => UtilityReading.fromPrisma(item));
  }

  async findByType(type: string): Promise<UtilityReading[]> {
    const data = await this.db.utilityReading.findMany({
      where: { type },
      orderBy: { readingDate: "desc" },
    });
    
    return data.map((item: any) => UtilityReading.fromPrisma(item));
  }

  async findByRoomAndType(roomId: string, type: string): Promise<UtilityReading[]> {
    const data = await this.db.utilityReading.findMany({
      where: { roomId, type },
      orderBy: { readingDate: "desc" },
    });
    
    return data.map((item: any) => UtilityReading.fromPrisma(item));
  }

  async findLatestByRoomAndType(
    roomId: string,
    type: string
  ): Promise<UtilityReading | null> {
    const data = await this.db.utilityReading.findFirst({
      where: { roomId, type },
      orderBy: { readingDate: "desc" },
    });
    
    return data ? UtilityReading.fromPrisma(data) : null;
  }

  async findConsumptionSummary(
    roomId?: string,
    type?: string,
    months: number = 6
  ): Promise<any[]> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months);

    const readings = await this.db.utilityReading.findMany({
      where: {
        roomId,
        type,
        readingDate: { gte: startDate },
      },
      include: { room: { select: { roomNumber: true } } },
      orderBy: { readingDate: "asc" },
    });

    return readings.map((reading: any) => ({
      id: reading.id,
      room: reading.room.roomNumber,
      type: reading.type,
      consumption: Number(reading.currentReading) - Number(reading.previousReading),
      cost:
        (Number(reading.currentReading) - Number(reading.previousReading)) *
        Number(reading.ratePerUnit),
      date: reading.readingDate,
    }));
  }

  async findAll(filters?: {
    type?: string;
    roomId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<UtilityReading[]> {
    const data = await this.db.utilityReading.findMany({
      where: {
        type: filters?.type,
        roomId: filters?.roomId,
        readingDate: {
          gte: filters?.startDate,
          lte: filters?.endDate,
        },
      },
      include: {
        room: {
          select: { id: true, roomNumber: true },
        },
      },
      orderBy: { readingDate: "desc" },
    });
    
    return data.map((item: any) => UtilityReading.fromPrisma(item));
  }

  async save(reading: UtilityReading): Promise<UtilityReading> {
    const data = await this.db.utilityReading.create({
      data: reading.toPrisma(),
    });
    
    return UtilityReading.fromPrisma(data);
  }

  async update(id: string, data: Partial<UtilityReading>): Promise<UtilityReading> {
    const updated = await this.db.utilityReading.update({
      where: { id },
      data: data.toPrisma ? data.toPrisma() : data,
    });
    
    return UtilityReading.fromPrisma(updated);
  }

  async delete(id: string): Promise<void> {
    await this.db.utilityReading.delete({
      where: { id },
    });
  }
}