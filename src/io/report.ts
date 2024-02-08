import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/report";
import { Report } from "@prisma/client";
import { NewReport } from "../definitions/report";

const newReport = async (socket: Socket, data: NewReport) => {
  console.log(data);

  try {
    const report = await databaseHandler.create(data);
    socket.emit("report:creation:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("report:creation:failed", { error: error });
  }
};

const updateReport = async (socket: Socket, data: NewReport) => {
  console.log(data);

  try {
    const report = await databaseHandler.update(data);

    socket.emit("report:update:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("report:update:failed", { error: error });
  }
};

const findReport = async (socket: Socket, id: number) => {
  try {
    const report = await databaseHandler.find(id);
    socket.emit("report:find:success", report);
  } catch (error) {
    console.error(`Error fetching report for ID: ${id}. Error: ${error}`);
    socket.emit("report:find:error", { error: error });
  }
};

const listReport = async (socket: Socket) => {
  try {
    const report = await databaseHandler.list();
    socket.emit("report:list:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("report:list:failed", { error: error });
  }
};

const createNewReportAtMidnight = async (socket: Socket, data: NewReport) => {
  try {
    const report = await databaseHandler.createNewReportAtMidnight(data);
    socket.emit("midnight:report:creation:success", report);
  } catch (error) {
    console.log(error);
    socket.emit("midnightreport:creation:failed", { error: error });
  }
};

export default {
  newReport,
  updateReport,
  findReport,
  listReport,
  createNewReportAtMidnight,
};
