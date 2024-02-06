import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/product";
import { Product } from "@prisma/client";

const newProduct = async (socket: Socket, data: Product) => {
  console.log(data);

  try {
    const product = await databaseHandler.create(data);
    socket.emit("product:creation:success", product);
  } catch (error) {
    console.log(error);
    socket.emit("product:creation:failed", { error: error });
  }
};

const updateProduct = async (socket: Socket, data: Product) => {
  console.log(data);

  try {
    const product = await databaseHandler.update(data);
    socket.emit("product:update:success", product);
  } catch (error) {
    console.log(error);
    socket.emit("product:update:failed", { error: error });
  }
};

const findProduct = async (socket: Socket, id: number) => {
  try {
    const product = await databaseHandler.find(id);
    socket.emit("product:find:success", product);
  } catch (error) {
    console.error(`Error fetching product for ID: ${id}. Error: ${error}`);
    socket.emit("product:find:error", { error: error });
  }
};

const listProduct = async (socket: Socket) => {
  try {
    const product = await databaseHandler.list();
    socket.emit("product:list:success", product);
  } catch (error) {
    console.error(`Error fetching reports. Error: ${error}`);
    socket.emit("product:list:error", { error: error });
  }
};

export default {
  newProduct,
  updateProduct,
  findProduct,
  listProduct,
};
