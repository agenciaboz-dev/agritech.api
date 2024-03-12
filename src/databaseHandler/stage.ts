// import { CloseCall, OpenCall } from "../definitions/call";
<<<<<<< HEAD
import { Stage, PrismaClient, Report, Call } from "@prisma/client";
import { NewStage } from "../types/stage";
import cronLib from "node-cron"; // Renamed import to avoid conflict
=======
import { Stage, PrismaClient, Report, Call } from "@prisma/client"
import { NewStage } from "../types/stage"
>>>>>>> 62412f3865876661278db39e39fb3ea7fbd57190

const prisma = new PrismaClient()

const create = async (data: NewStage) => {
    console.log(data)

    const existingStage = await prisma.stage.findFirst({
        where: {
            reportId: data.reportId,
            name: data.name,
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE1 already exists for this report.`)
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
            reportId: data.reportId,
        },
    })

    console.log(stage)
    return stage
}

const updateOne = async (data: Stage) => {
    console.log(data)
    const existingStage = await prisma.stage.findFirst({
        where: {
            reportId: data.reportId,
            name: "STAGE2",
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE2 already exists for this report.`)
    }

    // Update the stage's details
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

    // Create the next stage
    const stage2 = await prisma.stage.create({
        data: {
            name: "STAGE2",
            report: {
                connect: { id: stage1.reportId },
            },
        },
    })

    const updatedReport = await prisma.report.update({
<<<<<<< HEAD
      where: { id: existingStage.reportId },
      data: {
        stage: "STAGE4",
        close: new Date().getTime().toString(),
      },
      include: {
        stages: true,
        call: { include: { talhao: { include: { tillage: true } } } },
        material: true,
        operation: true,
        techReport: true,
        treatment: true,
      },
    });
=======
        where: { id: stage1.reportId },
        data: {
            stage: "STAGE2",
        },
        include: {
            stages: true,
        },
    })
>>>>>>> 62412f3865876661278db39e39fb3ea7fbd57190

    console.log(stage1, stage2, updatedReport)
    return { stage1, stage2, updatedReport }
}

const updateTwo = async (data: Stage) => {
    console.log(data)

    const existingStage = await prisma.stage.findFirst({
        where: {
            reportId: data.reportId,
            name: "STAGE3",
        },
    })

    if (existingStage) {
        throw new Error(`A stage with status STAGE3 already exists for this report.`)
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
            reportId: stage2.reportId,
        },
    })

    const updatedReport = await prisma.report.update({
        where: { id: stage2.reportId },
        data: {
            stage: "STAGE3",
        },
        include: {
            stages: true,
        },
    })

    console.log(stage2, stage3, updatedReport)
    return { stage2, stage3, updatedReport }
}

const updateThree = async (data: Stage) => {
    console.log(data)

    const existingStage = await prisma.stage.findUnique({
        where: { id: data.id },
        include: { report: true },
    })

    if (!existingStage) {
        throw new Error("Stage not found")
    }

    if (existingStage.report?.stage !== "STAGE4") {
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

        const updatedReport = await prisma.report.update({
            where: { id: existingStage.reportId },
            data: {
                stage: "STAGE4",
                close: new Date().getTime().toString(),
            },
            include: {
                stages: true,
                call: { include: { talhao: { include: { tillage: true } } } },
                material: true,
                operation: true,
                techReport: true,
                treatment: true,
            },
        })

        console.log(stage3, updatedReport)

        return { stage3, updatedReport }
    } else {
        throw new Error("Report is already at status STAGE4")
    }
}

cronLib.schedule("* * * * *", async () => {
  console.log("Midnight cron job started");

  // 1. Fetch reports that are not in STAGE4
  const activeReports = await prisma.report.findMany({
    where: {
      NOT: {
        stage: "STAGE4",
      },
    },
    include: {
      stages: {
        orderBy: {
          id: "desc",
        },
        take: 1,
      },
    },
  });

  console.log(activeReports);
  for (const report of activeReports) {
    const latestStage = report.stages[0]; // Assuming ordered DESC, so we take the first

    // Check if the latest stage is completed
    if (!latestStage.finish) {
      // Logic to advance stages or flag for manual closure
      try {
        if (report.stage === "STAGE1") {
          // Code to update from STAGE1 to STAGE2
          await updateOne({
            id: latestStage.id,
            reportId: report.id,
            name: "STAGE2",
            date: new Date().toISOString(),
            start: latestStage.start || new Date().toISOString(),
            finish: new Date().toISOString(),
            duration: "0", // Update as needed
            comments: "Automatically updated to STAGE2",
          });
          console.log(`Advanced report ${report.id} to STAGE2.`);
        } else if (report.stage === "STAGE2") {
          // Code to update from STAGE2 to STAGE3
          await updateTwo({
            id: latestStage.id,
            reportId: report.id,
            name: "STAGE3",
            date: new Date().toISOString(),
            start: latestStage.start || new Date().toISOString(),
            finish: new Date().toISOString(),
            duration: "0", // Update as needed
            comments: "Automatically updated to STAGE3",
          });
          console.log(`Advanced report ${report.id} to STAGE3.`);
        }
      } catch (error) {
        console.error(`Failed to advance report ${report.id}:`, error);
      }

      if (report.stage === "STAGE3") {
        // Flag for manual closure
        console.log(`Report ${report.id} at STAGE3 requires manual closure.`);
        // Here, integrate with notification system as needed
      }
    }
  }
});

export default {
    create,
    updateOne,
    updateTwo,
    updateThree,
}
