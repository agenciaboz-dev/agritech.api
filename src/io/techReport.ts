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

// const updateCoordinate = async (socket: Socket, data: any) => {
//     console.log("Coordenada atualizada:", data)

//     try {
//         const coordinate = await databaseHandler.update(data)

//         if (coordinate) {
//             socket.emit("coordinate:update:success", coordinate)
//             // socket.broadcast.emit("user:update", user)
//         } else {
//             socket.emit("coordinate:update:failed")
//         }
//     } catch (error) {
//         console.log(error)
//         socket.emit("coordinate:update:failed", { error: error })
//     }
// }

// const listCoordinate = async (socket: Socket) => {
//   console.log("Lista de coordenadas");
//   const coordinate = await databaseHandler.list();
//   socket.emit("coordinate:list:success", coordinate);
// };

export default {
  newTechReport,
};
