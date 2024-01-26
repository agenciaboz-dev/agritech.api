import { Stage } from "@prisma/client";

declare interface NewTreatment {
  id: number;
  products: number[];
  reportId: number;
}
