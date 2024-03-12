import { Stage } from "@prisma/client";

declare interface NewStage {
  name: string;
  date: string;
  start: string;
  finish: string;
  duration: string;
  comments: string;
  reportId: number;
}
