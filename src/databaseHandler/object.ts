import { NewObject } from "../definitions/object";
import { Object } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewObject) => {
  console.log("Iniciando a criação do objeto...");
  const object = await prisma.object.create({
    data: {
      name: data.name,
      description: data.description,
      quantity: data.quantity,
    },
  });
  console.log({ object });

  console.log("Objecto criado:", object);
  return object;
};

const update = async (data: Object) => {
  const object = await prisma.object.update({
    where: { id: data.id },
    data: {
      name: data.name,
      description: data.description,
      quantity: data.quantity,
      kitId: data.kitId,
    },
  });
  console.log("Coordinate Update: ", data);

  return object;
};

const list = async () => {
  return await prisma.object.findMany({
    include: {
      kit: true,
    },
  });
};

export default {
  create,
  update,
  list,
};
