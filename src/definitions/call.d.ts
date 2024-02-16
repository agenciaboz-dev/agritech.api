import { Call, Report, Stage, Talhao } from "@prisma/client";
import { NewTillage, Tillage, Report } from "./tillage";

declare interface OpenCall {
  id: number;
  open: string;
  comments: string;
  approved: boolean;

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

  talhao: Talhao;
  talhaoId?: number;
  kit?: Kit;
  kitId?: number;
  producerId: number;
  userId: number;
  forecast: string;
  hectarePrice: number;

  operation: Operation;
  treatment: Treatment;
  material: Material[];
  techReport: TechReport;
}

declare interface CloseCall {
  finish: Date;
}

interface ApproveCall {
  id: number;
  open: string;
  comments: string;
  approved: boolean;

  talhao: Talhao;
  talhaoId: number;
  report: Report;
  reportId: number;
  kit?: Kit;
  kitId?: number;
  producerId: number;
  userId: number;
  forecast: string;

  hectarePrice: number;
}
