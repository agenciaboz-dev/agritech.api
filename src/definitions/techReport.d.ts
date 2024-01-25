import { TechReport } from "@prisma/client";

declare interface NewTechReport {
  date: Date;
  init: Date;
  finish: Date;
  comments: string;
  reportId: number;
}
