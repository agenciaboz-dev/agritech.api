import { Flight } from "@prisma/client";

declare interface NewFlight {
  id: number;
  temperature: number;
  humidity: number;
  wind_velocity: number;
  height: number;
  faixa: number;
  flight_velocity: number;
  tank_volume: number;
  rate: number;
  performance: number;
  techReportId: number;
}
