import { PrismaClient } from "@prisma/client";
import { NewTalhao } from "../definitions/talhao";

const prisma = new PrismaClient();

const create = async (data: NewTalhao) => {
  console.log("Initiating Talhao Creation...");
  const talhao = await prisma.talhao.create({
    data: {
      name: data.name,
      area: data.area,
    },
  });
  console.log({ talhao });

  console.log("Talhao Created:", talhao);
  return { talhao };
};

const update = async (data: NewTalhao) => {
  const talhao = await prisma.talhao.update({
    where: { id: data.id },
    data: {
      name: data.name,
      area: data.area,
    },
  });
  console.log("Talhao Updated: ", data);

  return { talhao };
};

const find = async (id: number) => {
  return await prisma.talhao.findUnique({
    where: { id },
    include: { location: true, gallery: true, calls: true },
  });
};

const list = async () => {
  return await prisma.talhao.findMany({
    include: { location: true, gallery: true, calls: true },
  });
};

export default {
  create,
  update,
  find,
  list,
};
