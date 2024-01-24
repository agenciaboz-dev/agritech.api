// import { CloseCall, OpenCall } from "../definitions/call";
import { Stage, PrismaClient, Report, Call } from "@prisma/client"
import { NewStage } from "../definitions/stage"

const prisma = new PrismaClient()

const create = async (data: NewStage) => {
    console.log("Initiating new Stage...")
    const stage = await prisma.stage.create({
        data: {
            name: data.name,
            date: data.date,
            start: data.start,
            finish: data.finish,
            duration: data.duration,
            comments: data.comments,
            callId: data.callId,
        },
    })
    console.log({ stage })

    console.log("Stage Created:", stage)
    return stage
}

const updateOne = async (data: Stage) => {
    console.log("Initiating Stage update...")

    // Update the stage as before
    const stage1 = await prisma.stage.update({
        where: { id: data.id },
        data: {
            date: data.date,
            start: data.start,
            finish: data.finish,
            duration: data.duration,
            comments: data.comments,
        },
    })

    // Create the next stage as before
    const stage2 = await prisma.stage.create({
        data: {
            name: "STAGE2",
            callId: stage1.callId,
        },
    })

    const updatedCall = await prisma.call.update({
        where: { id: stage1.callId },
        data: {
            stage: "STAGE2",
        },
    })

    console.log("Stage 1 updated:", stage1)
    console.log("Stage 2 created:", stage2)
    console.log("Call updated:", updatedCall)
    console.log("Call Stage Status Updated")

    return { stage1, stage2, updatedCall }
}

const updateTwo = async (data: Stage) => {
    console.log("Initiating Stage update...")
    const stage2 = await prisma.stage.update({
        where: { id: data.id },
        data: {
            date: data.date,
            start: data.start,
            finish: data.finish,
            duration: data.duration,
            comments: data.comments,
        },
    })

    const stage3 = await prisma.stage.create({
        data: {
            name: "STAGE3",
            callId: stage2.callId,
        },
    })

    const updatedCall = await prisma.call.update({
        where: { id: stage2.callId },
        data: {
            stage: "STAGE3",
        },
    })

    console.log("Stage 2 updated:", stage2)
    console.log("Stage 3 created:", stage3)
    console.log("Call updated:", updatedCall)
    console.log("Call Stage Status Updated")

    return { stage2, stage3, updatedCall }
}

// const approve = async (data: Call) => {
//   try {
//     const call = await prisma.call.findUnique({ where: { id: data.id } });

//     if (call) {
//       const updatedCall = await prisma.call.update({
//         where: { id: data.id },
//         data: {
//           approved: data.kitId ? true : false,
//           status: "INPROGRESS",
//           kitId: data.kitId,
//         },
//       });
//       return updatedCall;
//     } else {
//       throw new Error("Call not found or kit already assigned");
//     }
//   } catch (error) {
//     console.error("Error in approving call:", error);
//     throw error;
//   }
// };

// const close = async (data: Call) => {
//   console.log("Iniciando a fechamento do chamado...");
//   const call = await prisma.call.update({
//     where: { id: data.id },
//     data: {
//       finish: new Date().toISOString(),
//       status: "CLOSED",
//     },
//   });
//   console.log({ call });

//   console.log("Chamado fechado:", call);

//   const report = await prisma.report.create({
//     data: {
//       callId: call.id,
//     },
//   });
//   console.log("Report criado para o chamado:", report);
//   return { call, report };
// };

// const list = async () => {
//   return await prisma.call.findMany({
//     include: {
//       kit: true,
//       producer: true,
//       user: true,
//     },
//   });
// };

// const find = async (id: number) => {
//   const report = await prisma.report.findUnique({ where: { id } });
//   console.log({ report });
//   return report;
// };

export default {
    create,
    updateOne,
    updateTwo,
    //   approve,
    //   close,
    //   list,
    //   find,
}
