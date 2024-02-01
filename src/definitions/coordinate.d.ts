import { Coordinate } from "@prisma/client";

declare interface NewCoordinate {
  x: string;
  y: string;
  tillageId: number | null;
  talhaoId?: number | null;
}
