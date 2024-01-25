import { Material } from "@prisma/client";

declare interface NewMaterial {
  talhao: number;
  area: number;
  product: number;
  dosage: number;
  classification: string;
  total: number;
  removed: string;
  applied: string;
  returned: string;
  comments: string;
  reportId: number;
}
