// import { CloseCall, OpenCall } from "../definitions/call";
import { Report, PrismaClient } from "@prisma/client";
import { NewReport } from "../definitions/report";

const prisma = new PrismaClient();

const create = async (data: NewReport) => {
  console.log("Iniciando a criação do relatório...");
  const report = await prisma.report.create({
    data: {
      callId: data.callId,
      producerId: data.producerId,
    },
  });
  console.log({ report });
  console.log("Report Criado aberto:", report);
  return report;
};

const update = async (data: Report) => {
  console.log("Initiating Report Update...");
  const report = await prisma.report.update({
    where: { id: data.id },
    data: {
      callId: data.callId,
    },
  });
  console.log("Report updated:", report);
  return report;
};

const find = async (id: number) => {
  return await prisma.report.findUnique({
    where: { id },
    include: {
      producer: true,
      operation: true,
      treatment: true,
      material: true,
      techReport: true,
    },
  });
};

const list = async () => {
  return await prisma.report.findMany({
    include: {
      producer: true,
      operation: true,
      treatment: true,
      material: true,
      techReport: true,
    },
  });
};

export default {
  create,
  update,
  find,
  list,
};
