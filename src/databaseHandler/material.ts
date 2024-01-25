import { NewMaterial } from "../definitions/material";
import { Material } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewMaterial) => {
  console.log("Initing Material Creation...");
  const material = await prisma.material.create({
    data: {
      talhao: data.talhao,
      area: data.area,
      product: data.product,
      dosage: data.dosage,
      classification: data.classification,
      total: data.total,
      removed: data.removed,
      applied: data.applied,
      returned: data.returned,
      comments: data.comments,
      reportId: data.reportId,
    },
  });
  console.log({ material });

  console.log("Material Created:", material);
  return material;
};

// const update = async (data: Material) => {
//   const material = await prisma.material.update({
//     where: { id: data.id },
//     data: {
//       name: data.name,
//       description: data.description,
//       quantity: data.quantity,
//       kitId: data.kitId,
//     },
//   });
//   console.log("Material Update: ", data);

//   return material;
// };

// const list = async () => {
//   return await prisma.material.findMany({
//     include: {
//       kit: true,
//     },
//   });
// };

const find = async (id: number) => {
  return await prisma.material.findUnique({ where: { id } });
};

export default {
  create,
  //   update,
  //   list,
  find,
};
