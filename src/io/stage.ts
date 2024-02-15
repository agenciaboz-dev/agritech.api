import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/stage";
import { NewStage } from "../definitions/stage";
import { Stage } from "@prisma/client";
import call from "./call";

const newStage = async (socket: Socket, data: NewStage) => {
  console.log("Creating STAGE1:", data);

  try {
    const stage = await databaseHandler.create(data);
    socket.emit("stage:creation:success", stage);
  } catch (error) {
    console.log(error);
    socket.emit("stage:creation:failed", { error: error });
  }
};

// Atualiza o Stage 1 para 2 e Cria o Stage 3
const updateStageOne = async (socket: Socket, data: Stage) => {
  try {
    const stage = await databaseHandler.updateOne(data);
    socket.emit("stage:updateOne:success", stage.stage1);
    socket.emit("stage:creationOne:success", stage.stage2);
    socket.emit("report:updateOne:success", stage.updatedReport);
  } catch (error) {
    console.log(error);
    socket.emit("stage:updateOne:failed", { error: error });
  }
};

// Atualiza o Stage 2 e Cria o Stage 3
const updateStageTwo = async (socket: Socket, data: Stage) => {
  try {
    const stage = await databaseHandler.updateTwo(data);
    socket.emit("stage:updateTwo:success", stage.stage2);
    socket.emit("stage:creationTwo:success", stage.stage3);
    socket.emit("report:updateTwo:success", stage.updatedReport);
  } catch (error) {
    console.log(error);
    socket.emit("stage:updateTwo:failed", { error: error });
  }
};
// Atualiza o Stage 3 para 4
const updateStageThree = async (socket: Socket, data: Stage) => {
  try {
    const stage = await databaseHandler.updateThree(data);
    socket.emit("stage:updateThree:success", stage.stage3);
    socket.emit("report:updateThree:success", stage.updatedReport);
  } catch (error) {
    console.log(error);
    socket.emit("stage:updateThree:failed", { error: error });
  }
};

export default {
  newStage,
  updateStageOne,
  updateStageTwo,
  updateStageThree,
};
