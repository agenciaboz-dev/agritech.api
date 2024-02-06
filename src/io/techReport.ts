import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/techReport";
import { NewTechReport } from "../definitions/techReport";

const newTechReport = async (socket: Socket, data: NewTechReport) => {
  console.log(data);

  try {
    const techReport = await databaseHandler.create(data);
    socket.emit("techReport:creation:success", techReport);
  } catch (error) {
    console.log(error);
    socket.emit("techReport:update:failed", { error: error });
  }
};

const updateTechReport = async (socket: Socket, data: NewTechReport) => {
  console.log(data);

  try {
    const techReport = await databaseHandler.update(data);
    socket.emit("techReport:update:success", techReport);
  } catch (error) {
    console.log(error);
    socket.emit("techReport:update:failed", { error: error });
  }
};

const findTechReport = async (socket: Socket, id: number) => {
  try {
    const techReport = await databaseHandler.find(id);
    socket.emit("techReport:find:success", techReport);
  } catch (error) {
    console.log(error);
    socket.emit("techReport:find:failed", { error: error });
  }
};

const listTechReport = async (socket: Socket) => {
  try {
    const techReport = await databaseHandler.list();
    socket.emit("techReport:list:success", techReport);
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
