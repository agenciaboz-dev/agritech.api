import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";

const newChat = async (socket: Socket, userId1: number, userId2: number) => {
  console.log("Novo Chamado:", userId1, userId2);

  try {
    const chat = await databaseHandler.chat.create(userId1, userId2);
    if (userId1 === undefined || userId2 === undefined) {
      throw new Error("User IDs are undefined");
    }

    if (chat) {
      socket.emit("call:creation:success", chat);
    } else {
      socket.emit("call:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:update:failed", { error: error });
  }
};

export default {
  newChat,
};
