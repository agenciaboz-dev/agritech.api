import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/flight";
import { NewFlight } from "../definitions/flight";
import { Flight } from "@prisma/client";

const newFlight = async (socket: Socket, data: NewFlight) => {
  console.log(data);

  try {
    const flight = await databaseHandler.create(data);
    socket.emit("flight:creation:success", flight);
  } catch (error) {
    console.log(error);
    socket.emit("flight:creation:failed", { error: error });
  }
};

const updateFlight = async (socket: Socket, data: NewFlight) => {
  console.log(data);

  try {
    const flight = await databaseHandler.update(data);
    socket.emit("flight:update:success", flight);
  } catch (error) {
    console.log(error);
    socket.emit("flight:update:failed", { error: error });
  }
};

const findFlight = async (socket: Socket, id: number) => {
  console.log(id);
  try {
    const flight = await databaseHandler.find(id);
    socket.emit("flight:find:success", flight);
  } catch (error) {
    console.error(`Error fetching flight for ID: ${id}. Error: ${error}`);
    socket.emit("flight:find:error", { error: error });
  }
};

const listFlight = async (socket: Socket) => {
  try {
    const flight = await databaseHandler.list();
    socket.emit("flight:list:success", flight);
  } catch (error) {
    console.error(`Error fetching flights. Error: ${error}`);
    socket.emit("flight:list:error", { error: error });
  }
};

export default {
  newFlight,
  updateFlight,
  findFlight,
  listFlight,
};
