import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/report";
import { Report } from "@prisma/client";

const newReport = async (socket: Socket, data: Report) => {
  console.log("New Report:", data);

  try {
    const report = await databaseHandler.create(data);

    if (report) {
      socket.emit("report:creation:success", report);
    } else {
      socket.emit("report:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("report:creation:failed", { error: error });
  }
};

const findReport = async (socket: Socket, data: { reportId: number }) => {
  const reportId = data.reportId;
  try {
    const reportDetails = await databaseHandler.find(reportId);
    console.log(reportDetails);
    if (reportDetails) {
      socket.emit("report:find:success", reportDetails);
    } else {
      socket.emit("report:find:failed", { error: "Relatório não encontrado." });
    }
  } catch (error) {
    console.error(`Error fetching report for ID: ${reportId}. Error: ${error}`);
    socket.emit("report:find:error", { error: error });
  }
};

export default {
  newReport,
  findReport,
};
