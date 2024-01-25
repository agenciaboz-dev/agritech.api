import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/flight";
import { NewFlight } from "../definitions/flight";

const newFlight = async (socket: Socket, data: NewFlight) => {
  console.log("New Flight Data:", data);

  try {
    const flight = await databaseHandler.create(data);

    if (flight) {
      socket.emit("flight:creation:success", flight);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("flight:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("flight:update:failed", { error: error });
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
  newFlight,
  // updateCoordinate,
  //   listCoordinate,
};
