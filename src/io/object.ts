import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/object";

const newObject = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const object = await databaseHandler.create(data);
    socket.emit("object:creation:success", object);
  } catch (error) {
    console.log(error);
    socket.emit("object:update:failed", { error: error });
  }
};

const updateObject = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const object = await databaseHandler.update(data);
    socket.emit("object:update:success", object);
  } catch (error) {
    console.log(error);
    socket.emit("object:update:failed", { error: error });
  }
};

const listObject = async (socket: Socket) => {
  console.log("Lista de objetos");
  const object = await databaseHandler.list();
  socket.emit("object:list:success", object);
};

export default {
  newObject,
  updateObject,
  listObject,
};
