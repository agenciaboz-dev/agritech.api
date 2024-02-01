import { Gallery } from "@prisma/client";

declare interface NewGallery {
  id: int;
  images?: Image[];
  urls?: string[];
  tillageId: number;
  talhaoId: number;
}

declare interface Image {
  file: ArrayBuffer;
  name: string;
}
