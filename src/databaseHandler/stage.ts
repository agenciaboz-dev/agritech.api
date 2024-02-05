// import { CloseCall, OpenCall } from "../definitions/call";
import { Stage, PrismaClient, Report, Call } from "@prisma/client"
import { NewStage } from "../definitions/stage"

const prisma = new PrismaClient()

const create = async (data: NewStage) => {
    console.log("Initiating new Stage...")

    // Check if a stage with the same status already exists for the given call
    const existingStage = await prisma.stage.findFirst({
        where: {
            callId: data.callId,
            name: data.name, // Assuming 'name' represents the status (STAGE0, STAGE1, etc.)
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE1 already exists for this call.`)
    }

    // If no existing stage, proceed with creating the new stage
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

    console.log("Stage Created:", stage)
    return stage
}

const updateOne = async (data: Stage) => {
    console.log("Initiating Stage1 update...")
    const existingStage = await prisma.stage.findFirst({
        where: {
            callId: data.callId,
            name: "STAGE2",
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE2 already exists for this call.`)
    }

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
        include: {
            stages: true,
        },
    })

    console.log("Stage 1 updated:", stage1)
    console.log("Stage 2 created:", stage2)
    console.log("Call updated:", updatedCall)
    console.log("Call Stage Status Updated")

    return { stage1, stage2, updatedCall }
}

const updateTwo = async (data: Stage) => {
    console.log("Initiating Stage2 update...")

    const existingStage = await prisma.stage.findFirst({
        where: {
            callId: data.callId,
            name: "STAGE3",
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE3 already exists for this call.`)
    }
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
        include: {
            stages: true,
        },
    })

    console.log("Stage 2 updated:", stage2)
    console.log("Stage 3 created:", stage3)
    console.log("Call updated:", updatedCall)
    console.log("Call Stage Status Updated")

    return { stage2, stage3, updatedCall }
}
const updateThree = async (data: Stage) => {
    console.log("Initiating Stage3 update...")

    const existingStage = await prisma.stage.findUnique({
        where: { id: data.id },
        include: { call: true },
    })

    if (!existingStage) {
        throw new Error("Stage not found")
    }

    // Check if the current status is not "STAGE4"
    if (existingStage.call?.stage !== "STAGE4") {
        const stage3 = await prisma.stage.update({
            where: { id: data.id },
            data: {
                date: data.date,
                start: data.start,
                finish: data.finish,
                duration: data.duration,
                comments: data.comments,
            },
        })

        const updatedCall = await prisma.call.update({
            where: { id: existingStage.callId },
            data: {
                stage: "STAGE4",
            },
        })

        console.log("Stage 3 updated:", stage3)
        console.log("Call updated:", updatedCall)
        console.log("Call Stage Status Updated")

        return { stage3, updatedCall }
    } else {
        throw new Error("Call is already at status STAGE4")
    }
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
    updateThree,
    //   approve,
    //   close,
    //   list,
    //   find,
}
