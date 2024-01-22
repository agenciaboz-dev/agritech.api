import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/tillage";

const newTillage = async (socket: Socket, data: any) => {
  console.log("Lavoura recebida:", data);

  try {
    const tillage = await databaseHandler.create(data);

    if (tillage) {
      socket.emit("tillage:creation:success", tillage);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("tillage:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("tillage:update:failed", { error: error });
  }
};

const updateTillage = async (socket: Socket, data: any) => {
  console.log("Lavoura recebida atualizada:", data);

  try {
    const tillage = await databaseHandler.update(data);

    if (tillage) {
      socket.emit("tillage:update:success", tillage);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("tillage:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("tillage:update:failed", { error: error });
  }
};

const listTillage = async (socket: Socket) => {
  // console.log("Lista de tillages")
  const tillage = await databaseHandler.list();
  socket.emit("tillage:list:success", tillage);
};

export default {
  newTillage,
  updateTillage,
  listTillage,
};
