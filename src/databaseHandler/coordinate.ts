import { NewCoordinate } from "../definitions/coordinate";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewCoordinate) => {
  console.log("Iniciando a criação do coordenada...");
  const coordinate = await prisma.coordinate.create({
    data: {
      x: data.x,
      y: data.y,
      tillageId: data.tillageId,
    },
  });
  console.log({ coordinate });

  console.log("Coordenada criada e associada ao terren:", coordinate);
  return { coordinate };
};

// const update = async (data: NewTillage & { id: number }) => {
//   const tillage = await prisma.tillage.update({
//     where: { id: data.id },
//     data: {
//       name: data.name,
//       area: data.area,
//       owner: data.owner,
//       ceo: data.ceo,
//       manager: data.manager,
//       agronomist: data.agronomist,
//       technician: data.technician,
//       pilot: data.pilot,
//       others: data.others,
//       comments: data.comments,
//       address: {
//         update: {
//           street: data.address.street,
//           number: data.address.number,
//           city: data.address.city,
//           cep: data.address.cep,
//           adjunct: data.address.adjunct || "",
//           district: data.address.district,
//           uf: data.address.uf,
//         },
//       },
//     },
//   });
//   console.log("tillage update: ", data);

//   return { tillage };
// };

// const list = async () => {
//   return await prisma.tillage.findMany({
//     include: {
//       address: true,
//     },
//   });
// };

export default {
  create,
  //   update,
  //   list,
};
