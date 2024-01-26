import { PrismaClient } from "@prisma/client";
import { NewProduct } from "../definitions/product";

const prisma = new PrismaClient();

const create = async (data: NewProduct) => {
  console.log("Initiating Product Creation...");
  const product = await prisma.product.create({
    data: {
      name: data.name,
      dosage: data.dosage,
      unit: data.unit,
      treatmentId: data.treatmentId,
    },
  });
  console.log({ product });

  console.log("Product Created:", product);
  return { product };
};

const update = async (data: NewProduct) => {
  const product = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      dosage: data.dosage,
      unit: data.unit,
      treatmentId: data.treatmentId,
    },
  });
  console.log("Product Updated: ", data);

  return { product };
};

const find = async (id: number) => {
  return await prisma.product.findUnique({ where: { id } });
};

const list = async () => {
  return await prisma.product.findMany({});
};

export default {
  create,
  update,
  find,
  list,
};
