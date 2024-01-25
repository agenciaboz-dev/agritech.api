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

  console.log("Objecto criado:", treatment);
  return treatment;
};

// const update = async (data: Treatment) => {
//   const treatment = await prisma.treatment.update({
//     where: { id: data.id },
//     data: {
//       products: data.products,
//     },
//   });
//   console.log("Coordinate Update: ", data);

//   return treatment;
// };

// const list = async () => {
//   return await prisma.treatment.findMany({
//     include: {
//       kit: true,
//     },
//   });
// };

export default {
  create,
  //   update,
  //   list,
};
