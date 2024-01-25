import { Operation } from "@prisma/client";

declare interface NewOperation {
  culture: string;
  areaMap: string;
  equipment: string;
  model: string;
  service: string;
  reportId: number;
}
