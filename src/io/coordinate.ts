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

const updateCoordinate = async (socket: Socket, data: any) => {
  console.log("Coordenada atualizada:", data);

  try {
    const coordinate = await databaseHandler.coordinate.update(data);

    if (coordinate) {
      socket.emit("coordinate:update:success", coordinate);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("coordinate:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("coordinate:update:failed", { error: error });
  }
};

const listCoordinate = async (socket: Socket) => {
  console.log("Lista de coordenadas");
  const coordinate = await databaseHandler.coordinate.list();
  socket.emit("tillage:list:success", coordinate);
};

export default {
  newCoordinate,
  updateCoordinate,
  listCoordinate,
};
