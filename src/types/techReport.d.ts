import { TechReport } from "@prisma/client";

declare interface NewTechReport {
  id: number;
  date: string;
  init: string;
  finish: string;
  comments: string;
  flight: Flight[];
  reportId: number;
}
