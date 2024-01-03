import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";

const newCoordinate = async (socket: Socket, data: any) => {
  console.log("Nova Coordenada:", data);

  try {
    const coordinate = await databaseHandler.coordinate.create(data);

    if (coordinate) {
      socket.emit("coordinate:creation:success", coordinate);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("coordinate:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("coordinate:update:failed", { error: error });
  }
};

// const updateTillage = async (socket: Socket, data: any) => {
//   console.log("Usuário atualizado:", data);

//   try {
//     const tillage = await databaseHandler.tillage.update(data);

//     if (tillage) {
//       socket.emit("tillage:update:success", tillage);
//       // socket.broadcast.emit("user:update", user)
//     } else {
//       socket.emit("tillage:update:failed");
//     }
//   } catch (error) {
//     console.log(error);
//     socket.emit("tillage:update:failed", { error: error });
//   }
// };

// const listTillage = async (socket: Socket) => {
//   console.log("Lista de tillages");
//   const tillage = await databaseHandler.tillage.list();
//   socket.emit("tillage:list:success", tillage);
// };

export default {
  newCoordinate,
  //   updateCoordinate,
  //   listCoordinate
};
