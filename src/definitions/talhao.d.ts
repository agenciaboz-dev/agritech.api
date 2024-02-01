import { Talhao, Coordinate, Gallery, Call } from "@prisma/client";

declare interface NewTalhao {
  id: number;
  name: string;
  area: string;
  location: Coordinate[];
  gallery: Gallery[];
  calls: Call[];
}
