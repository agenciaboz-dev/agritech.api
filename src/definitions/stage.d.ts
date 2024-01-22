import { Stage } from "@prisma/client";

declare interface NewStage {
  name: string;
  date: Date;
  start: Date;
  finish: Date;
  duration: string;
  comments: string;
  callId: number;
}
