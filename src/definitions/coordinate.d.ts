import { Coordinate } from "@prisma/client";

declare interface NewCoordinate {
  id: number;
  x: string;
  y: string;
  tillageId: number | null;
  talhaoId?: number | null;
}
