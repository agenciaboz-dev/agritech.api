import { Call, Report, Stage, Talhao } from "@prisma/client";
import { NewTillage, Tillage } from "./tillage";

declare interface OpenCall {
  id: number;
  open: string;
  comments: string;
  approved: boolean;
  stages?: Stage[];

  talhao: Talhao;
  talhaoId: number;
  kit?: Kit;
  kitId?: number;
  producerId: number;
  userId: number;
  forecast: string;

  hectarePrice: number;
}

declare interface AdminCall {
  id: number;
  open: string;
  init: string;
  comments: string;
  approved: boolean;
  stages?: Stage[];

  talhao: Talhao;
  talhaoId: number;
  kit?: Kit;
  kitId?: number;
  producerId: number;
  userId: number;
  forecast: string;
  hectarePrice: number;
}

declare interface CloseCall {
  finish: Date;
}
