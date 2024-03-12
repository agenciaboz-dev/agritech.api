// import { CloseCall, OpenCall } from "../definitions/call";
import { PrismaClient, Operation } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: Operation) => {
  console.log(data);
  const operation = await prisma.operation.create({
    data: {
      culture: data.culture,
      areaMap: data.areaMap,
      equipment: data.equipment,
      model: data.model,
      service: data.service,
      reportId: data.reportId,
    },
  });
  console.log({ operation });
  return operation;
};

const update = async (data: Operation) => {
  console.log(data);
  const operation = await prisma.operation.update({
    where: { id: data.id },
    data: {
      culture: data.culture,
      areaMap: data.areaMap,
      equipment: data.equipment,
      model: data.model,
      service: data.service,
      reportId: data.reportId,
    },
  });
  console.log({operação:operation});
  return operation;
};

const list = async () => {
  return await prisma.operation.findMany();
};

const find = async (id: number) => {
  return await prisma.operation.findUnique({ where: { id } });
};

export default {
  create,
  find,
  update,
  list,
};
