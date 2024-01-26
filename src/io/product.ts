import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/product";
import { Product } from "@prisma/client";

const newProduct = async (socket: Socket, data: Product) => {
  console.log("New Product:", data);

  try {
    const product = await databaseHandler.create(data);

    if (product) {
      socket.emit("product:creation:success", product);
    } else {
      socket.emit("product:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("product:creation:failed", { error: error });
  }
};

const updateProduct = async (socket: Socket, data: Product) => {
  console.log("Update Product:", data);

  try {
    const product = await databaseHandler.update(data);

    if (product) {
      socket.emit("product:update:success", product);
    } else {
      socket.emit("product:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("product:update:failed", { error: error });
  }
};

const findProduct = async (socket: Socket, data: { productId: number }) => {
  const productId = data.productId;
  try {
    const product = await databaseHandler.find(productId);
    console.log(product);
    if (product) {
      socket.emit("product:find:success", product);
    } else {
      socket.emit("product:find:failed", {
        error: "Product not found",
      });
    }
  } catch (error) {
    console.error(
      `Error fetching product for ID: ${productId}. Error: ${error}`
    );
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
