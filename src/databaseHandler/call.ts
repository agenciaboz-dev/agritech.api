// import { CloseCall, OpenCall } from "../definitions/call";
import { Call, PrismaClient, Report } from "@prisma/client";
import createReport from "./report";
import { OpenCall, AdminCall } from "../definitions/call";

const prisma = new PrismaClient();

const inclusions = {
  call: {
    stages: true,
    tillage: {
      include: {
        address: true,
        location: true,
        gallery: true,
        talhao: { include: { name: true, area: true, location: true } },
      },
    },
    report: true,
    kit: true,
    producer: {
      include: { tillage: true, user: true },
    },
    user: true,
  },
};

const adminCreate = async (data: AdminCall) => {
  try {
    console.log("Initiating the creation and update of the call...");

    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Create the call
      const call = await prisma.call.create({
        data: {
          open: new Date().getTime().toString(),
          approved: data.approved,
          comments: data.comments,
          talhaoId: data.talhaoId,
          producerId: data.producerId,
          userId: data.userId,
          kitId: data.kitId || undefined,
          forecast: data.forecast,
        },
      });

      // Update the producer
      const producer = await prisma.producer.update({
        where: { id: data.producerId },
        data: {
          hectarePrice: data.hectarePrice,
        },
      });

      // Create the stage
      const stage = await prisma.stage.create({
        data: {
          name: "STAGE1",
          callId: call.id,
        },
      });

      // Update the call
      const updatedCall = await prisma.call.update({
        where: { id: call.id },
        data: {
          approved: data.kitId ? true : false,
          status: "INPROGRESS",
          stage: "STAGE1",
          kitId: data.kitId,
          init: new Date().getTime().toString(),
        },
      });

      console.log("Call, Producer, Stage, and Updated Call created/updated:", {
        call,
        producer,
        stage,
        updatedCall,
      });

      return { call, producer, stage, updatedCall };
    });

    console.log("Transaction completed successfully.");
    return result;
  } catch (error) {
    console.error("Error in creating and updating the call:", error);
    throw error;
  }
};

const create = async (data: OpenCall) => {
  console.log("Iniciando a criação do chamado...");
  const call = await prisma.call.create({
    data: {
      open: new Date().getTime().toString(),
      approved: data.approved,
      comments: data.comments,
      talhaoId: data.talhaoId,
      producerId: data.producerId,
      userId: data.userId,
      kitId: data.kitId || undefined,
      forecast: data.forecast,
    },
  });

  const producer = await prisma.producer.update({
    where: { id: data.producerId },
    data: {
      hectarePrice: data.hectarePrice,
    },
  });

  console.log({ call, producer });

  console.log("Chamado aberto:", call, producer);
  return { call, producer };
};

const update = async (data: Call) => {
  console.log("Iniciando a atualização do chamado...");
  const call = await prisma.call.update({
    where: { id: data.id },
    data: {
      open: data.open,
      init: data.init,
      finish: data.finish,
      approved: data.approved,
      comments: data.comments,
      status: data.status,
      stage: data.stage,
      talhaoId: data.talhaoId,
      producerId: data.producerId,
      userId: data.userId,
      kitId: data.kitId,
      totalPrice: data.totalPrice, // Remove the extra semicolon here
    },
  });
  console.log({ call });

  console.log("Chamado atualizado:", call);
  return call;
};

const approve = async (data: OpenCall) => {
  try {
    const call = await prisma.call.findUnique({ where: { id: data.id } });

    if (call) {
      const existingStage = await prisma.stage.findFirst({
        where: {
          callId: data.id,
          name: "STAGE1",
        },
      });

      if (existingStage) {
        // Throw an error if a stage with the same name already exists for the call
        throw new Error("A STAGE1 stage already exists for this call");
      }

      const updatedCall = await prisma.call.update({
        where: { id: data.id },
        data: {
          approved: data.kitId ? true : false,
          status: "INPROGRESS",
          stage: "STAGE1",
          kitId: data.kitId,
          init: new Date().getTime().toString(),
        },
      });

      const producer = await prisma.producer.update({
        where: { id: data.producerId },
        data: {
          hectarePrice: data.hectarePrice ?? undefined,
        },
      });

      const stage = await prisma.stage.create({
        data: {
          name: "STAGE1",
          callId: updatedCall.id,
        },
      });
      console.log("Stage 1 Criado:", stage);

      return { call: updatedCall, stage, producer };
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
      finish: new Date().getTime().toString(),
      status: "CLOSED",
    },
  });
  console.log({ call });

  console.log("Chamado fechado:", call);

  return { call };
};

const cancel = async (data: Call) => {
  console.log("Iniciando o cancelamento do chamado...");
  const call = await prisma.call.update({
    where: { id: data.id },
    data: {
      status: "CANCELED",
    },
  });
  console.log({ call });

  console.log("Chamado Cancelado:", call);

  const report = await prisma.report.create({
    data: {
      callId: call.id,
    },
  });
  console.log("Report criado para o chamado:", report);
  return { call, report };
};

const list = async () => {
  const calls = await prisma.call.findMany({
    include: {
      kit: { include: { employees: true, calls: true, objects: true } },
      producer: { include: { user: true } },
      user: true,
      stages: true,
      tillage: true,

      report: {
        include: {
          operation: true,
        },
      },
    },
  });

  // Process each call and update the totalPrice
  const updatedCalls = await Promise.all(
    calls.map(async (call) => {
      const producerHectarePrice = call.producer?.hectarePrice || 0;
      const areaTrabalhada = call.report?.areaTrabalhada || 0;

      // Calculate the desired value for each call
      const calculatedValue = producerHectarePrice * areaTrabalhada;

      // Update the totalPrice in the database
      const updatedCall = await prisma.call.update({
        where: { id: call.id },
        data: {
          totalPrice: calculatedValue,
        },
        include: {
          kit: { include: { employees: true, calls: true, objects: true } },
          producer: { include: { user: true } },
          user: true,
          stages: true,
          tillage: true,
          report: {
            include: {
              operation: true,
            },
          },
        },
      });

      return updatedCall;
    })
  );

  return updatedCalls;
};

const listPending = async () => {
  return await prisma.call.findMany({
    where: { approved: false },
    include: {
      kit: true,
      producer: { include: { user: true } },
      user: true,
      tillage: true,
    },
  });
};
const listApproved = async () => {
  return await prisma.call.findMany({
    where: { approved: true },
    include: {
      kit: {
        include: {
          employees: { include: { user: true } },
          calls: true,
          objects: true,
        },
      },
      tillage: { include: { address: true } },
      producer: { include: { user: true } },
      user: true,
      stages: true,
      report: {
        include: {
          operation: true,
          treatment: { include: { products: true } },
          material: true,
          techReport: { include: { flight: true } },
        },
      },
    },
  });
};

const find = async (id: number) => {
  const report = await prisma.report.findUnique({ where: { id } });
  console.log({ report });
  return report;
};

export default {
  adminCreate,
  create,
  update,
  approve,
  close,
  cancel,
  list,
  listPending,
  listApproved,
  find,
};
