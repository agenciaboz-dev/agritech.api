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

export default {
  newMaterial,
  findMaterial,
};
