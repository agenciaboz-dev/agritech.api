import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/techReport";
import { NewTechReport } from "../definitions/techReport";

const newTechReport = async (socket: Socket, data: NewTechReport) => {
  console.log("New Flight Data:", data);

  try {
    const techReport = await databaseHandler.create(data);

    if (techReport) {
      socket.emit("techReport:creation:success", techReport);
    } else {
      socket.emit("techReport:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("techReport:update:failed", { error: error });
  }
};

const updateTechReport = async (socket: Socket, data: NewTechReport) => {
  console.log("New Flight Data:", data);

  try {
    const techReport = await databaseHandler.update(data);

    if (techReport) {
      socket.emit("techReport:update:success", techReport);
    } else {
      socket.emit("techReport:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("techReport:update:failed", { error: error });
  }
};

const findTechReport = async (socket: Socket, id: number) => {
  try {
    const techReport = await databaseHandler.find(id);

    if (techReport) {
      socket.emit("techReport:find:success", techReport);
    } else {
      socket.emit("techReport:find:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("techReport:find:failed", { error: error });
  }
};

const listTechReport = async (socket: Socket) => {
  try {
    const techReport = await databaseHandler.list();

    if (techReport) {
      socket.emit("techReport:list:success", techReport);
    } else {
      socket.emit("techReport:list:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("techReport:list:failed", { error: error });
  }
};

export default {
  newTechReport,
  updateTechReport,
  findTechReport,
  listTechReport,
};
