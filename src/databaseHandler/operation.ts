// import { CloseCall, OpenCall } from "../definitions/call";
import { PrismaClient, Operation } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: Operation) => {
  console.log("Initiating Operation Creation");
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
  console.log("Report Criado aberto:", operation);
  return operation;
};

const find = async (id: number) => {
  return await prisma.report.findUnique({ where: { id } });
};

export default {
  create,
  find,
};
