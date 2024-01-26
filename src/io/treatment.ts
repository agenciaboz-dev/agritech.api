import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/treatment";
import { Report, Treatment } from "@prisma/client";
import { NewTreatment } from "../definitions/treatment";

const newTreatment = async (socket: Socket, data: NewTreatment) => {
  console.log("New Report:", data);

  try {
    const treatment = await databaseHandler.create(data);

    if (treatment) {
      socket.emit("treatment:creation:success", treatment);
    } else {
      socket.emit("treatment:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("treatment:creation:failed", { error: error });
  }
};

const updateTreatment = async (socket: Socket, data: NewTreatment) => {
  console.log("Update Treatment:", data);

  try {
    const treatment = await databaseHandler.update(data);

    if (treatment) {
      socket.emit("treatment:update:success", treatment);
    } else {
      socket.emit("treatment:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("treatment:update:failed", { error: error });
  }
};

const findTreatment = async (socket: Socket, data: { treatmentId: number }) => {
  const treatmentId = data.treatmentId;
  try {
    const treatment = await databaseHandler.find(treatmentId);
    console.log(treatment);
    if (treatment) {
      socket.emit("treatment:find:success", treatment);
    } else {
      socket.emit("treatment:find:failed", {
        error: "Treatment not found",
      });
    }
  } catch (error) {
    console.error(
      `Error fetching treatment for ID: ${treatmentId}. Error: ${error}`
    );
    socket.emit("treatment:find:error", { error: error });
  }
};

const listTreatment = async (socket: Socket) => {
  try {
    const treatments = await databaseHandler.list();
    console.log(treatments);
    if (treatments) {
      socket.emit("treatment:list:success", treatments);
    } else {
      socket.emit("treatment:list:failed", {
        error: "Treatment not found",
      });
    }
  } catch (error) {
    console.error(`Error fetching treatments. Error: ${error}`);
    socket.emit("treatment:list:error", { error: error });
  }
};

export default {
  newTreatment,
  updateTreatment,
  findTreatment,
  listTreatment,
};
