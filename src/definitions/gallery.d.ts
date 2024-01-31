import { Gallery } from "@prisma/client";

declare interface NewGallery {
  images?: Image[];
  urls?: string[];
  tillageId: number;
}

declare interface Image {
  file: ArrayBuffer;
  name: string;
}
