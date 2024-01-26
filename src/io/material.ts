import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/material";
import { Material } from "@prisma/client";

const newMaterial = async (socket: Socket, data: Material) => {
  console.log("New Report:", data);

  try {
    const material = await databaseHandler.create(data);

    if (material) {
      socket.emit("material:creation:success", material);
    } else {
      socket.emit("material:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("material:creation:failed", { error: error });
  }
};

const updateMaterial = async (socket: Socket, data: Material) => {
  console.log("Update Report:", data);

  try {
    const material = await databaseHandler.update(data);

    if (material) {
      socket.emit("material:update:success", material);
    } else {
      socket.emit("material:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("material:update:failed", { error: error });
  }
};

const findMaterial = async (socket: Socket, data: { materialId: number }) => {
  const materialId = data.materialId;
  try {
    const material = await databaseHandler.find(materialId);
    console.log(material);
    if (material) {
      socket.emit("material:find:success", material);
    } else {
      socket.emit("material:find:failed", {
        error: "Material não encontrado.",
      });
    }
  } catch (error) {
    console.error(
      `Error fetching report for ID: ${materialId}. Error: ${error}`
    );
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
