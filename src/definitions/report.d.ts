import {
  Report,
  Producer,
  Operation,
  Treatment,
  Material,
  TechReport,
} from "@prisma/client";

declare interface NewReport {
  id: number;
  callId: number;
  producerId: number;
  operation: Operation;
  treatment: Treatment;
  material: Material[];
  techReport: TechReport;
}

declare interface ReportProducer {
  id: number;
  cnpj: string;
  contract: boolean;
  tillage?: Tillage[];
  employeeId?: number;
  reportId?: number;
  userid: number;
  hectarePrice?: number;
}
