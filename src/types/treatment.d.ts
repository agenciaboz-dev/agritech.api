import { Product, Stage } from "@prisma/client";

declare interface NewTreatment {
  id: number;
  products: Product[];
  reportId: number;
}
