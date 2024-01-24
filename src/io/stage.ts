import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/stage";
import { NewStage } from "../definitions/stage";
import { Stage } from "@prisma/client";
import call from "./call";

// Cria o Stage 1
const newStage = async (socket: Socket, data: NewStage) => {
  console.log("New Stage:", data);

  try {
    const stage = await databaseHandler.create(data);

    if (stage) {
      socket.emit("stage:creation:success", stage);
    } else {
      socket.emit("stage:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("stage:update:failed", { error: error });
  }
};

// Atualiza o Stage 1 e Cria o Stage 2
const updateStageOne = async (socket: Socket, data: Stage) => {
  try {
    const stage = await databaseHandler.updateOne(data);

    if (stage) {
      socket.emit("stage:update:success", stage.stage1);
      socket.emit("stage:creation:success", stage.stage2);
      socket.emit("call:update:success", stage.updatedCall);
    } else {
      socket.emit("stage:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("stage:update:failed", { error: error });
  }
};
// Atualiza o Stage 2 e Cria o Stage 3
const updateStageTwo = async (socket: Socket, data: Stage) => {
  try {
    const stage = await databaseHandler.updateTwo(data);

    if (stage) {
      socket.emit("stage:update:success", stage.stage2);
      socket.emit("stage:creation:success", stage.stage3);
      socket.emit("call:update:success", stage.updatedCall);
    } else {
      socket.emit("stage:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("stage:update:failed", { error: error });
  }
};

export default {
  newStage,
  updateStageOne,
  updateStageTwo,
};
