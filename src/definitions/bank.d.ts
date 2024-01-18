import { Bank } from "@prisma/client";

declare interface NewBank {
  name: string;
  agency: string;
  type: string;
  account: string;
  employeeId: number;
}
