import { GetUpcomingPaymentsQuery } from "../queries/get-upcoming-payments.query";

export class GetUpcomingPaymentsHandler {
  constructor(private readonly db: any) {}

  async handle(_query: GetUpcomingPaymentsQuery) {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return this.db.payment.findMany({
      where: {
        status: "PENDING",
        dueDate: { lte: nextWeek },
      },
      include: {
        boarder: {
          select: {
            firstName: true,
            lastName: true,
            room: { select: { roomNumber: true } },
          },
        },
      },
      orderBy: { dueDate: "asc" },
      take: 10,
    });
  }
}