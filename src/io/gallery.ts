import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/gallery";
import { NewGallery } from "../definitions/gallery";
import { Gallery } from "@prisma/client";

const newGallery = async (socket: Socket, data: any) => {
  console.log("Nova Galeria:", data);

  try {
      const gallery = await databaseHandler.create(data)

      socket.emit("gallery:creation:success", gallery)
      // socket.broadcast.emit("user:update", user)
  } catch (error) {
    console.log(error);
    socket.emit("gallery:creation:failed", { error: error });
  }
};

const updateGallery = async (socket: Socket, data: Gallery) => {
  console.log("Galeria atualizada:", data);

  try {
    const gallery = await databaseHandler.update(data);

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
  const gallery = await databaseHandler.list();
  socket.emit("gallery:list:success", gallery);
};

export default {
  newGallery,
  updateGallery,
  listGallery,
};
