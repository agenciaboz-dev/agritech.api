import { NewFlight } from "../definitions/flight";
import { Gallery, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: NewFlight) => {
  console.log(data);
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
  return { flight };
};

const update = async (data: NewFlight) => {
  const flight = await prisma.flight.update({
    where: { id: data.id },
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
  return { flight };
};

const find = async (id: number) => {
  return await prisma.flight.findUnique({ where: { id } });
};

const list = async () => {
  return await prisma.flight.findMany({});
};

export default {
  create,
  update,
  find,
  list,
};
