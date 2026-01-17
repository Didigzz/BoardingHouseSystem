// Utility entity types

export interface Utility {
  id: string;
  name: string;
  type: UtilityType;
  amount: number;
  billingCycle: BillingCycle;
  lastBilled: Date;
  nextBillingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export enum UtilityType {
  ELECTRICITY = "ELECTRICITY",
  WATER = "WATER",
  INTERNET = "INTERNET",
  OTHER = "OTHER",
}

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  BI_WEEKLY = "BI_WEEKLY",
  WEEKLY = "WEEKLY",
}

export interface CreateUtilityInput {
  name: string;
  type: UtilityType;
  amount: number;
  billingCycle: BillingCycle;
  nextBillingDate: Date;
}

export interface UpdateUtilityInput {
  name?: string;
  type?: UtilityType;
  amount?: number;
  billingCycle?: BillingCycle;
  lastBilled?: Date;
  nextBillingDate?: Date;
}
