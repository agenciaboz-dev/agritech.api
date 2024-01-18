import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/bank";

const newBank = async (socket: Socket, data: any) => {
  console.log("Novos dados bancarios:", data);

  try {
    const bank = await databaseHandler.create(data);

    if (bank) {
      socket.emit("bank:creation:success", bank);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("bank:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("gallery:creation:failed", { error: error });
  }
};

const updateBank = async (socket: Socket, data: any) => {
  console.log("Dados bancarios atualizados:", data);

  try {
    const bank = await databaseHandler.update(data);

    if (bank) {
      socket.emit("bank:update:success", bank);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("bank:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("bank:update:failed", { error: error });
  }
};

const listBank = async (socket: Socket) => {
  console.log("Lista de dados bancarios");
  const bank = await databaseHandler.list();
  socket.emit("bank:list:success", bank);
};

export default {
  newBank,
  updateBank,
  listBank,
};
