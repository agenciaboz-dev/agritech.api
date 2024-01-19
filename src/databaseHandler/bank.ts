import { NewBank } from "../definitions/bank";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewBank) => {
  console.log("Iniciando a criação de dados bancarios...");
  const bank = await prisma.bank.create({
    data: {
      name: data.name,
      agency: data.agency,
      type: data.type,
      account: data.account,
      employeeId: data.employeeId,
    },
  });
  console.log({ bank });

  console.log("Dados bancarios criados:", bank);
  return { bank };
};

const update = async (data: NewBank) => {
  const bank = await prisma.bank.update({
    where: { employeeId: data.employeeId },
    data: {
      name: data.name,
      agency: data.agency,
      type: data.type,
      account: data.account,
    },
  });
  console.log("Bank details updated: ", data);

  return { bank };
};

const list = async () => {
  return await prisma.bank.findMany({});
};

export default {
  create,
  update,
  list,
};
