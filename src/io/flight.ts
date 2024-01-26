import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/flight";
import { NewFlight } from "../definitions/flight";

const newFlight = async (socket: Socket, data: NewFlight) => {
  console.log("New Flight Data:", data);

  try {
    const flight = await databaseHandler.create(data);

    if (flight) {
      socket.emit("flight:creation:success", flight);
    } else {
      socket.emit("flight:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("flight:update:failed", { error: error });
  }
};

const updateFlight = async (socket: Socket, data: NewFlight) => {
  console.log("Update Flight Data:", data);

  try {
    const flight = await databaseHandler.update(data);

    if (flight) {
      socket.emit("flight:update:success", flight);
    } else {
      socket.emit("flight:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("flight:update:failed", { error: error });
  }
};

const findFlight = async (socket: Socket, data: { flightId: number }) => {
  const flightId = data.flightId;
  try {
    const flight = await databaseHandler.find(flightId);
    console.log(flight);
    if (flight) {
      socket.emit("flight:find:success", flight);
    } else {
      socket.emit("flight:find:failed", { error: "Flight não encontrado." });
    }
  } catch (error) {
    console.error(`Error fetching flight for ID: ${flightId}. Error: ${error}`);
    socket.emit("flight:find:error", { error: error });
  }
};

const listFlight = async (socket: Socket) => {
  try {
    const flights = await databaseHandler.list();
    socket.emit("flight:list:success", flights);
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
