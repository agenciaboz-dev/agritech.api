import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/coordinate";
import { NewCoordinate } from "../definitions/coordinate";

const newCoordinate = async (socket: Socket, data: NewCoordinate) => {
  console.log(data);

  try {
    const coordinate = await databaseHandler.create(data);
    socket.emit("coordinate:creation:success", coordinate);
  } catch (error) {
    console.log(error);
    socket.emit("coordinate:update:failed", { error: error });
  }
};

const updateCoordinate = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const coordinate = await databaseHandler.update(data);
    socket.emit("coordinate:update:success", coordinate);
  } catch (error) {
    console.log(error);
    socket.emit("coordinate:update:failed", { error: error });
  }
};

const findCoordinate = async (socket: Socket, id: number) => {
  console.log(id);

  try {
    const coordinate = await databaseHandler.find(id);
    socket.emit("coordinate:find:success", coordinate);
  } catch (error) {
    console.log(error);
    socket.emit("coordinate:find:failed", { error: error });
  }
};

const listCoordinate = async (socket: Socket) => {
  console.log("Lista de coordenadas");
  const coordinate = await databaseHandler.list();
  socket.emit("coordinate:list:success", coordinate);
};

export default {
  newCoordinate,
  updateCoordinate,
  listCoordinate,
  findCoordinate,
};
