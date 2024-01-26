import { Call, Report, Stage } from "@prisma/client";
import { NewTillage, Tillage } from "./tillage";

declare interface OpenCall {
  id: number;
  open: Date;
  comments: string;
  approved: boolean;
  stages?: Stage[];

  tillage: Tillage;
  tillageId: number;
  kit?: Kit;
  kitId?: number;
  producerId: number;
  userId: number;

  hectarePrice: number;
}

declare interface CloseCall {
  finish: Date;
}
