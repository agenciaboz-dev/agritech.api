// import { CloseCall, OpenCall } from "../definitions/call";
import { Call, PrismaClient, Report } from "@prisma/client";
import createReport from "./report";
import { OpenCall } from "../definitions/call";

const prisma = new PrismaClient();

const create = async (data: OpenCall) => {
  console.log("Iniciando a criação do chamado...");
  const call = await prisma.call.create({
    data: {
      open: new Date().toISOString(),
      approved: data.approved,
      comments: data.comments,
      tillageId: data.tillageId,
      producerId: data.producerId,
      userId: data.userId,
      kitId: data.kitId || undefined,
    },
  });
  console.log({ call });

  console.log("Chamado aberto:", call);
  return call;
};

const approve = async (data: Call) => {
  try {
    const call = await prisma.call.findUnique({ where: { id: data.id } });

    if (call) {
      const updatedCall = await prisma.call.update({
        where: { id: data.id },
        data: {
          approved: data.kitId ? true : false,
          kitId: data.kitId,
        },
      });
      return updatedCall;
    } else {
      throw new Error("Call not found or kit already assigned");
    }
  } catch (error) {
    console.error("Error in approving call:", error);
    throw error;
  }
};

const close = async (data: Call) => {
  console.log("Iniciando a fechamento do chamado...");
  const call = await prisma.call.update({
    where: { id: data.id },
    data: {
      finish: new Date().toISOString(),
    },
  });
  console.log({ call });

  console.log("Chamado fechado:", call);

  const report = await prisma.report.create({
    data: {
      callId: call.id,
    },
  });
  console.log("Report criado para o chamado:", report);
  return { call, report };
};

const cancel = async (data: Call) => {
  try {
    const call = await prisma.call.findUnique({ where: { id: data.id } });

    if (!call) {
      throw new Error("Call not found");
    }

    await prisma.call.delete({
      where: { id: data.id },
    });

    return { message: "Call successfully deleted" };
  } catch (error) {
    console.error("Error in canceling call:", error);
    throw error;
  }
};

// const update = async (data: Call & { id: number }) => {
//   const call = await prisma.calendar.update({
//     where: { id: data.id },
//     data: {
//       name: data.name,
//     },
//   });
//   console.log("Coordinate Update: ", data);

//   return calendar;
// };

const list = async () => {
  return await prisma.call.findMany({
    include: {
      kit: true,
      producer: true,
      user: true,
    },
  });
};
const listPending = async () => {
  return await prisma.call.findMany({
    where: { approved: false },
    include: {
      kit: true,
      producer: true,
      user: true,
    },
  });
};
const listApproved = async () => {
  return await prisma.call.findMany({
    where: { approved: true },
    include: {
      kit: true,
      producer: true,
      user: true,
    },
  });
};

const find = async (id: number) => {
  const report = await prisma.report.findUnique({ where: { id } });
  console.log({ report });
  return report;
};

export default {
  create,
  approve,
  close,
  cancel,
  list,
  listPending,
  listApproved,
  find,
};
