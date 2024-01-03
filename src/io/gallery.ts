import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";

const newGallery = async (socket: Socket, data: any) => {
  console.log("Nova Galeria:", data);

  try {
    const gallery = await databaseHandler.gallery.create(data);

    if (gallery) {
      socket.emit("gallery:creation:success", gallery);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("gallery:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("gallery:update:failed", { error: error });
  }
};

const updateGallery = async (socket: Socket, data: any) => {
  console.log("Galeria atualizada:", data);

  try {
    const gallery = await databaseHandler.gallery.update(data);

    if (gallery) {
      socket.emit("gallery:update:success", gallery);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("gallery:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("gallery:update:failed", { error: error });
  }
};

const listGallery = async (socket: Socket) => {
  console.log("Lista de galerias");
  const gallery = await databaseHandler.gallery.list();
  socket.emit("gallery:list:success", gallery);
};

export default {
  newGallery,
  updateGallery,
  listGallery,
};
