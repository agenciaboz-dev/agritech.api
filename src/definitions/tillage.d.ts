import { Address, Coordinate, Producer } from "@prisma/client";

type Coordinate = {
  x: string;
  y: string;
};

type Gallery = {
  image: string;
};

declare interface NewTillage {
  name: string;
  area: string;
  owner: string;
  ceo: string;
  manager?: string;
  agronomist?: string;
  technician?: string;
  pilot?: string;
  others?: string;
  comments?: string;
  address: {
    street: string;
    district: string;
    number: string;
    city: string;
    cep: string;
    uf: string;
    adjunct?: string;
  };
  location?: Coordinate[];
  gallery?: Gallery[];

  producer?: { id: number };
}
