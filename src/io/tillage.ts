import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/tillage";

const newTillage = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const tillage = await databaseHandler.create(data);

    socket.emit("tillage:creation:success", tillage);
  } catch (error) {
    console.log(error);
    socket.emit("tillage:creation:failed", { error: error });
  }
};

const updateTillage = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const tillage = await databaseHandler.update(data);
    socket.emit("tillage:update:success", tillage);
  } catch (error) {
    console.log(error);
    socket.emit("tillage:update:failed", { error: error });
  }
};

const listTillage = async (socket: Socket) => {
  const tillage = await databaseHandler.list();
  socket.emit("tillage:list:success", tillage);
};

export default {
  newTillage,
  updateTillage,
  listTillage,
};
