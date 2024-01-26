import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/operation";
import { Operation } from "@prisma/client";

const newOperation = async (socket: Socket, data: Operation) => {
  console.log("New Report:", data);

  try {
    const operation = await databaseHandler.create(data);

    if (operation) {
      socket.emit("operation:creation:success", operation);
    } else {
      socket.emit("operation:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("operation:creation:failed", { error: error });
  }
};

const updateOperation = async (socket: Socket, data: Operation) => {
  console.log("Update Report:", data);

  try {
    const operation = await databaseHandler.update(data.id, data);

    if (operation) {
      socket.emit("operation:update:success", operation);
    } else {
      socket.emit("operation:update:failed");
    }
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

const findOperation = async (socket: Socket, data: { operationId: number }) => {
  const operationId = data.operationId;
  try {
    const operation = await databaseHandler.find(operationId);
    console.log(operation);
    if (operation) {
      socket.emit("operation:find:success", operation);
    } else {
      socket.emit("operation:find:failed", { error: "Relatório não encontrado." });
    }
  } catch (error) {
    console.error(
      `Error fetching report for ID: ${operationId}. Error: ${error}`
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
