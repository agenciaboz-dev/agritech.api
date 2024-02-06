import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/operation";
import { Operation } from "@prisma/client";
import operation from "../databaseHandler/operation";

const newOperation = async (socket: Socket, data: Operation) => {
  console.log(data);

  try {
    const operation = await databaseHandler.create(data);
    socket.emit("operation:creation:success", operation);
  } catch (error) {
    console.log(error);
    socket.emit("operation:creation:failed", { error: error });
  }
};

const updateOperation = async (socket: Socket, data: Operation) => {
  console.log(data);

  try {
    const operation = await databaseHandler.update(data);

    socket.emit("operation:update:success", operation);
  } catch (error) {
    console.log(error);
    socket.emit("operation:update:failed", { error: error });
  }
};

const listOperation = async (socket: Socket) => {
  try {
    const operations = await databaseHandler.list();
    socket.emit("operation:list:success", operations);
  } catch (error) {
    console.error(`Error fetching reports. Error: ${error}`);
    socket.emit("operation:list:error", { error: error });
  }
};

const findOperation = async (socket: Socket, id: number) => {
  try {
    const operation = await databaseHandler.find(id);
    console.log(operation);

    socket.emit("operation:find:success", operation);
  } catch (error) {
    console.error(
      `Error fetching report for ID: ${operation}. Error: ${error}`
    );
    socket.emit("operation:find:error", { error: error });
  }
};

export default {
  newOperation,
  findOperation,
  updateOperation,
  listOperation,
};
