import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/bank";
import { NewBank } from "../definitions/bank";

const newBank = async (socket: Socket, data: NewBank) => {
  console.log(data);
  try {
    const bank = await databaseHandler.create(data);
    socket.emit("bank:creation:success", bank);
  } catch (error) {
    console.log(error);
    socket.emit("bank:creation:failed", { error: error });
  }
};

const updateBank = async (socket: Socket, data: NewBank) => {
  console.log(data);
  try {
    const bank = await databaseHandler.update(data);
    socket.emit("bank:update:success", bank);
  } catch (error) {
    console.log(error);
    socket.emit("bank:update:failed", { error: error });
  }
};

const findBank = async (socket: Socket, id: number) => {
  console.log(id);
  try {
    const bank = await databaseHandler.find(id);
    socket.emit("bank:find:success", bank);
  } catch (error) {
    console.log(error);
    socket.emit("bank:find:failed", { error: error });
  }
};

const listBank = async (socket: Socket) => {
  const bank = await databaseHandler.list();
  socket.emit("bank:list:success", bank);
};

export default {
  newBank,
  updateBank,
  findBank,
  listBank,
};
