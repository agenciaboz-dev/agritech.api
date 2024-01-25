// import { CloseCall, OpenCall } from "../definitions/call";
import { Stage, PrismaClient, Report, Call } from "@prisma/client";
import { NewTechReport } from "../definitions/techReport";

const prisma = new PrismaClient();

const create = async (data: NewTechReport) => {
  console.log("Initiating new TechReport...");
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

  console.log("TechReport Created:", techReport);
  return techReport;
};

export default {
  create,
};
