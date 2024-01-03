import { Coordinate } from "@prisma/client";

declare interface NewCoordinate {
  x: string;
  y: string;
  tillageId: number;
}
