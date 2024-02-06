import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/material";
import { Material } from "@prisma/client";

const newMaterial = async (socket: Socket, data: Material) => {
  console.log(data);

  try {
    const material = await databaseHandler.create(data);
    socket.emit("material:creation:success", material);
  } catch (error) {
    console.log(error);
    socket.emit("material:creation:failed", { error: error });
  }
};

const updateMaterial = async (socket: Socket, data: Material) => {
  console.log(data);

  try {
    const material = await databaseHandler.update(data);
    socket.emit("material:update:success", material);
  } catch (error) {
    console.log(error);
    socket.emit("material:update:failed", { error: error });
  }
};

const findMaterial = async (socket: Socket, id: number) => {
  console.log(id);
  try {
    const material = await databaseHandler.find(id);
    socket.emit("material:find:success", material);
  } catch (error) {
    console.error(`Error fetching report for ID: ${id}. Error: ${error}`);
    socket.emit("report:find:error", { error: error });
  }
};

const listMaterial = async (socket: Socket) => {
  try {
    const materials = await databaseHandler.list();
    socket.emit("material:list:success", materials);
  } catch (error) {
    console.error(`Error fetching reports. Error: ${error}`);
    socket.emit("material:list:error", { error: error });
  }
};

export default {
  newMaterial,
  updateMaterial,
  findMaterial,
  listMaterial,
};
