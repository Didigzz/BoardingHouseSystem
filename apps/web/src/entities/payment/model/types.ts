import type { Payment as PrismaPayment, PaymentStatus, PaymentType } from "@prisma/client";

export type Payment = PrismaPayment & {
  boarder?: {
    id: string;
    firstName: string;
    lastName: string;
    room?: { roomNumber: string } | null;
  };
};

export { PaymentStatus, PaymentType };
