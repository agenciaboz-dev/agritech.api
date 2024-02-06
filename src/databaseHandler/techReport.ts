import { Stage, PrismaClient, Report, Call } from "@prisma/client";
import { NewTechReport } from "../definitions/techReport";

const prisma = new PrismaClient();

const create = async (data: NewTechReport) => {
  console.log(data);
  const techReport = await prisma.techReport.create({
    data: {
      date: data.date,
      init: data.init,
      finish: data.finish,
      comments: data.comments,
      reportId: data.reportId,
    },
  });
  console.log({ techReport });
  return techReport;
};

const update = async (data: NewTechReport) => {
  console.log(data);
  const techReport = await prisma.techReport.update({
    where: { id: data.id },
    data: {
      date: data.date,
      init: data.init,
      finish: data.finish,
      comments: data.comments,
      reportId: data.reportId,
    },
  });
  console.log(techReport);

  return techReport;
};

const find = async (id: number) => {
  return await prisma.techReport.findUnique({ where: { id } });
};

const list = async () => {
  return await prisma.techReport.findMany({});
};

export default {
  create,
  update,
  find,
  list,
};
