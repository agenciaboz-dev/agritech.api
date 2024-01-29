import { Gallery } from "@prisma/client";

declare interface NewGallery {
  images?: Image[];
  tillageId: number;
}

declare interface Image {
  file: ArrayBuffer;
  name: string;
}
