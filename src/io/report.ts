import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import { Report } from "@prisma/client";

const newReport = async (socket: Socket, data: Report) => {
  console.log("Novo Chamado:", data);

  try {
    const report = await databaseHandler.report.create(data);

    if (report) {
      socket.emit("report:creation:success", report);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("report:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("report:creation:failed", { error: error });
  }
};

export default {
  newReport,
};
