import { NewTreatment } from "../definitions/treatment";
import { Treatment } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewTreatment) => {
  console.log("Initiating Treatment Creation...");
  const treatment = await prisma.treatment.create({
    data: {
      reportId: data.reportId,
    },
  });
  console.log({ treatment });

  console.log("Treatment Created:", treatment);
  return treatment;
};

const update = async (data: NewTreatment) => {
  const treatment = await prisma.treatment.update({
    where: { id: data.id },
    data: {
      reportId: data.reportId,
    },
  });
  console.log("Objecto actualizado: ", data);

  return treatment;
};

const find = async (id: number) => {
  return await prisma.treatment.findUnique({ where: { id } });
};

const list = async () => {
  return await prisma.treatment.findMany({});
};

export default {
  create,
  update,
  find,
  list,
};
