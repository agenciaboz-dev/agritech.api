import { Address, Employee, Producer } from "@prisma/client";

declare interface NewUser {
  username: string;
  email: string;
  password: string;
  name: string;
  cpf: string;
  birth: string;
  phone: string;
  image: string;
  image64: string;
  address: Address;
  isAdmin: boolean;
  approved: boolean;
    rejected: string;

  employee?: {
    rg: string;
    gender: string;
    nationality: string;
    relationship: string;
    voter_card: string;
    work_card: string;
    military: string;
    residence: string;
    bank_data: {
      account: string;
      type: string;
      name: string;
      agency: string;
    };
  };
  producer?: Producer;
}

declare interface LoginForm {
  login: string;
  password: string;
}

