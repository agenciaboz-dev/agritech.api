import { Report, Producer, Operation, Material, Flight } from "@prisma/client";

declare interface Flight {
  humidity: number;
  wind_velocity: number;
  height: number;
  faixa: number;
  flight_velocity: number;
  tank_volume: number;
  rate: number;
  performance: number;
}

declare interface Product {
  name: string;
  dosage: number;
  unit: string;
}

declare interface TechReport {
  date: Date;
  init: Date;
  finish: Date;
  comments: string;
  flight: Flight[];
}

declare interface Treatment {
  product: Product[];
}

declare interface NewReport {
  id: number;
  callId: number;
  operation: Operation;
  treatment: Treatment;
  material: Material[];
  techReport: TechReport;
}
