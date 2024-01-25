import { NewFlight } from "../definitions/flight";
import { Gallery, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewFlight) => {
  console.log("Iniciando a criação do flight report...");
  const flight = await prisma.flight.create({
    data: {
      temperature: data.temperature,
      humidity: data.humidity,
      wind_velocity: data.wind_velocity,
      height: data.height,
      faixa: data.faixa,
      flight_velocity: data.flight_velocity,
      tank_volume: data.tank_volume,
      rate: data.rate,
      performance: data.performance,
      techReportId: data.techReportId,
    },
  });
  console.log({ flight });

  console.log("Galeria criada:", flight);
  return { flight };
};

// const update = async (data: Gallery) => {
//   const gallery = await prisma.gallery.update({
//     where: { tillageId: data.tillageId },
//     data: {
//       image: data.image,
//     },
//   });
//   console.log("Image Update: ", data);

//   return { gallery };
// };

// const list = async () => {
//   return await prisma.gallery.findMany({});
// };

export default {
  create,
  //   update,
  //   list,
};
