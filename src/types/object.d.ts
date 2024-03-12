import { Object } from "@prisma/client";

declare interface NewObject {
  name: string;
  description: string;
  quantity: number;
  kitId: number;
}
