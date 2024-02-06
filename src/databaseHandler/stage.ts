// import { CloseCall, OpenCall } from "../definitions/call";
import { Stage, PrismaClient, Report, Call } from "@prisma/client";
import { NewStage } from "../definitions/stage";

const prisma = new PrismaClient();

const create = async (data: NewStage) => {
  console.log(data);

  const existingStage = await prisma.stage.findFirst({
    where: {
      callId: data.callId,
      name: data.name,
    },
  });

  if (existingStage) {
    throw new Error(`A stage with status STAGE1 already exists for this call.`);
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
  });

  console.log(stage);
  return stage;
};

const updateOne = async (data: Stage) => {
  console.log(data);
  const existingStage = await prisma.stage.findFirst({
    where: {
      callId: data.callId,
      name: "STAGE2",
    },
  });

  if (existingStage) {
    throw new Error(`A stage with status STAGE2 already exists for this call.`);
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
  });

  // Create the next stage
  const stage2 = await prisma.stage.create({
    data: {
      name: "STAGE2",
      callId: stage1.callId,
    },
  });

  const updatedCall = await prisma.call.update({
    where: { id: stage1.callId },
    data: {
      stage: "STAGE2",
    },
    include: {
      stages: true,
    },
  });

  console.log(stage1, stage2, updatedCall);
  return { stage1, stage2, updatedCall };
};

const updateTwo = async (data: Stage) => {
  console.log(data);

  const existingStage = await prisma.stage.findFirst({
    where: {
      callId: data.callId,
      name: "STAGE3",
    },
  });

  if (existingStage) {
    throw new Error(`A stage with status STAGE3 already exists for this call.`);
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
  });

  const stage3 = await prisma.stage.create({
    data: {
      name: "STAGE3",
      callId: stage2.callId,
    },
  });

  const updatedCall = await prisma.call.update({
    where: { id: stage2.callId },
    data: {
      stage: "STAGE3",
    },
    include: {
      stages: true,
    },
  });

  console.log(stage2, stage3, updatedCall);
  return { stage2, stage3, updatedCall };
};

const updateThree = async (data: Stage) => {
  console.log(data);

  const existingStage = await prisma.stage.findUnique({
    where: { id: data.id },
    include: { call: true },
  });

  if (!existingStage) {
    throw new Error("Stage not found");
  }

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
    });

    const updatedCall = await prisma.call.update({
      where: { id: existingStage.callId },
      data: {
        stage: "STAGE4",
      },
      include: {
        stages: true,
      },
    });

    console.log(stage3, updatedCall);

    return { stage3, updatedCall };
  } else {
    throw new Error("Call is already at status STAGE4");
  }
};

export default {
  create,
  updateOne,
  updateTwo,
  updateThree,
};
