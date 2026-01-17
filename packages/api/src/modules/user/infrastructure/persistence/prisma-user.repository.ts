import { IUserRepository } from "../../domain/repositories/user.repository.interface";
import { User } from "../../domain/entities/user.entity";

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly db: any) {}

  async findById(id: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: { id },
    });
    
    return data ? User.fromPrisma(data) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const data = await this.db.user.findUnique({
      where: { email },
    });
    
    return data ? User.fromPrisma(data) : null;
  }

  async save(user: User): Promise<User> {
    const data = await this.db.user.create({
      data: user.toPrisma(),
    });
    
    return User.fromPrisma(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const updated = await this.db.user.update({
      where: { id },
      data: data.toPrisma ? data.toPrisma() : data,
    });
    
    return User.fromPrisma(updated);
  }

  async delete(id: string): Promise<void> {
    await this.db.user.delete({
      where: { id },
    });
  }
}