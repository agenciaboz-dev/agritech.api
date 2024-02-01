import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/talhao";

const newTalhao = async (socket: Socket, data: any) => {
  console.log("Talhao Recieved:", data);

  try {
    const talhao = await databaseHandler.create(data);
    socket.emit("talhao:create:success", talhao);
  } catch (error) {
    console.log(error);
    socket.emit("talhao:create:failed", { error: error });
  }
};

const updateTalhao = async (socket: Socket, data: any) => {
  console.log("Updated Talhao:", data);

  try {
    const talhao = await databaseHandler.update(data);
    socket.emit("talhao:update:success", talhao);
  } catch (error) {
    console.log(error);
    socket.emit("talhao:update:failed", { error: error });
  }
};

const findTalhao = async (socket: Socket, id: number) => {
  const talhao = await databaseHandler.find(id);
  socket.emit("talhao:find:success", talhao);
};

const listTalhao = async (socket: Socket) => {
  const talhao = await databaseHandler.list();
  socket.emit("talhao:list:success", talhao);
};

export default {
  newTalhao,
  updateTalhao,
  listTalhao,
  findTalhao,
};
