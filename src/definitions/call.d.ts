import { Call, Report, Stage } from "@prisma/client";
import { NewTillage, Tillage } from "./tillage";

declare interface OpenCall {
  open: Date;
  comments: string;
  approved: boolean;
  stages?: Stage[];

  tillageId: number;
  kitId?: number;
  producerId: number;
  userId: number;
}

declare interface CloseCall {
  finish: Date;
}
