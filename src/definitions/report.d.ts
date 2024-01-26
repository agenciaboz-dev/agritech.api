import { Report } from "@prisma/client";

declare interface NewReport {
  id: number;
  callId: number;
  producerId: number;
  operation: Operation;
  treatment: Treatment;
  material: Material[];
  techReport: TechReport;
}
