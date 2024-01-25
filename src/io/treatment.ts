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

// const findReport = async (socket: Socket, data: { reportId: number }) => {
//   const reportId = data.reportId;
//   try {
//     const reportDetails = await databaseHandler.find(reportId);
//     console.log(reportDetails);
//     if (reportDetails) {
//       socket.emit("report:find:success", reportDetails);
//     } else {
//       socket.emit("report:find:failed", { error: "Relatório não encontrado." });
//     }
//   } catch (error) {
//     console.error(`Error fetching report for ID: ${reportId}. Error: ${error}`);
//     socket.emit("report:find:error", { error: error });
//   }
// };

export default {
  newTreatment,
  //   findReport,
};
