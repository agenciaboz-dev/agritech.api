// import { CloseCall, OpenCall } from "../definitions/call";
import { Report, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (data: Report) => {
  console.log("Iniciando a criação do relatório...");
  const report = await prisma.report.create({
    data: {
      callId: data.callId,
    },
  });
  console.log({ report });
  console.log("Report Criado aberto:", report);
  return report;
};

const find = async (id: number) => {
  return await prisma.report.findUnique({ where: { id } });
};

export default {
  create,
  find,
};
