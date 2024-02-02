import { NewCoordinate } from "../definitions/coordinate";
import { Coordinate, PrismaClient } from "@prisma/client";
import coordinate from "../io/coordinate";

const prisma = new PrismaClient();

const create = async (data: NewCoordinate) => {
  console.log("Iniciando a criação do coordenada...");
  const coordinate = await prisma.coordinate.create({
    data: {
      x: data.x,
      y: data.y,
      tillageId: data.tillageId,
      talhaoId: data.talhaoId,
    },
  });
  console.log({ coordinate });

  console.log("Coordenada criada e associada ao terren:", coordinate);
  return { coordinate };
};

const update = async (data: NewCoordinate) => {
  const coordinate = await prisma.coordinate.update({
    where: { id: data.id },
    data: {
      x: data.x,
      y: data.y,
    },
  });
  console.log("Coordinate Update: ", data);

  return { coordinate };
};

const list = async () => {
  return await prisma.coordinate.findMany({
    include: {
      tillage: true,
      talhao: true,
    },
  });
};

export default {
  create,
  update,
  list,
};
