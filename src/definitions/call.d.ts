import { Call, Report } from "@prisma/client";

declare interface OpenCall {
  open: Date;
  producerId: number;
  userId: number;
}

declare interface CloseCall {
  finish: Date;
}
