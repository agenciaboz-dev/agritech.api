import { TechReport } from "@prisma/client";

declare interface NewTechReport {
  id: number;
  date: Date;
  init: Date;
  finish: Date;
  comments: string;
  reportId: number;
}
