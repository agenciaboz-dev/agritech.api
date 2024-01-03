import { NewKit, AddEmployeeToKit } from "../definitions/kit";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewKit) => {
  console.log("Iniciando a criação do kit...");
  const kit = await prisma.kit.create({
    data: {
      image: data.image,
      image64: data.image64,
      name: data.name,
      description: data.description,
    },
  });

  console.log("Usuário criado:", kit);
  return { kit };
};

const update = async (data: NewKit & { id: number }) => {
  const kit = await prisma.kit.update({
    where: { id: data.id },
    data: {
      image: data.image,
      image64: data.image64,
      name: data.name,
      description: data.description,
    },
  });
  console.log("Kit update: ", data);

  return kit;
};

const list = async () => {
  return await prisma.kit.findMany({
    include: {
      calendar: true,
      calls: true,
      employees: true,
      objects: true,
    },
  });
};

const add = async (data: AddEmployeeToKit) => {
  const kit = await prisma.kit.update({
    where: { id: data.kitId },
    data: {
      employees: {
        connect: { id: data.employeeId },
      },
    },
    include: {
      employees: true,
    },
  });
  console.log("Kit update: ", data);

  return kit;
};

export default {
  create,
  update,
  list,
  add,
};
