import { Server as SocketIoServer } from "socket.io";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";

import { Socket } from "socket.io";
import cep from "./geolocalTest";
import weather from "./weatherApi";

import { Client, ClientBag } from "../definitions/client";
import { LoginForm } from "../definitions/user";

import user from "./user";
import tillage from "./tillage";
import coordinate from "./coordinate";
import kit from "./kit";

import { User, Tillage, Coordinate, Gallery, Kit } from "@prisma/client";

import { NewTillage } from "../definitions/tillage";
import { NewCoordinate } from "../definitions/coordinate";
import { NewGallery } from "../definitions/gallery";
import { NewKit } from "../definitions/kit";
import gallery from "./gallery";

let io: SocketIoServer | null = null;

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
  io = new SocketIoServer(server, {
    cors: { origin: "*" },
    maxHttpBufferSize: 1e8,
  });
};

export const getIoInstance = () => {
  if (!io) {
    throw new Error(
      "Socket.IO has not been initialized. Please call initializeIoServer first."
    );
  }
  return io;
};

export let clientList: Client[] = [];

const get = (socket: Socket) =>
  clientList.find((client) => client.socket == socket);
const find = (id: number) => clientList.find((client) => client.user.id == id);
const getUser = (client: Client) => client.user;
const list = () => clientList.map((client) => client.user);

const remove = (client: Client | undefined) => {
  if (!client) return;
  clientList = clientList.filter((item) => item.socket != client.socket);
};

const add = (client: Client) => {
  const exists = find(client.user.id);
  if (exists) remove(client);

  clientList.push(client);
};

const update = (client: Client, user: User) =>
  (clientList = [
    ...clientList.filter((item) => item.socket != client.socket),
    { ...client, user },
  ]);

export const handleSocket = (socket: Socket) => {
  const io = getIoInstance();

  const clients: ClientBag = {
    get,
    find,
    getUser,
    list,
    add,
    remove,
    update,
  };
  console.log(`new connection:${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`disconnected: ${socket.id}`);
    const client = clients.get(socket);
    if (client) {
      user.logout(socket, clients, client.user);
    }
  });

  //USER OPS

  socket.on("user:logout", (data) => user.logout(socket, clients, data));

  socket.on("user:signup", (newUser: User) => user.newUser(socket, newUser));

  socket.on("user:reject", (id) => user.reject(socket, id));

  socket.on("user:approve", (id) => user.approve(socket, id));

  socket.on("user:login", (data: LoginForm) => user.handleLogin(socket, data));

  socket.on("user:find", (userId: number) => user.findUser(socket, { userId }));

  socket.on("users:list", () => user.listUsersApproved(socket));
  // socket.on("user:list", (userId: number) => user.findUser(socket, { userId }));

  socket.on("user:update", (updateUser: User, userId: number) =>
    user.updateUser(socket, updateUser)
  );

  socket.on("user:pendingApproval", () => user.listPendingApproval(socket));

  // TILLAGE OPS

  socket.on("tillage:new", (newTillage: NewTillage) =>
    tillage.newTillage(socket, newTillage)
  );
  socket.on("tillage:update", (updateTillage: Tillage) =>
    tillage.updateTillage(socket, updateTillage)
  );

  socket.on("tillage:list", () => tillage.listTillage(socket));

  // COORDINATE OPS
  socket.on("coordinate:new", (newCoorinate: NewCoordinate) =>
    coordinate.newCoordinate(socket, newCoorinate)
  );

  socket.on("coordinate:update", (updateCoordinate: Coordinate) =>
    coordinate.updateCoordinate(socket, updateCoordinate)
  );

  socket.on("coordinate:list", () => {
    coordinate.listCoordinate(socket);
  });

  // GALLERY OPS
  socket.on("gallery:new", (newGallery: NewGallery) =>
    gallery.newGallery(socket, newGallery)
  );

  socket.on("gallery:update", (updateGallery: Gallery) =>
    gallery.updateGallery(socket, updateGallery)
  );

  socket.on("gallery:list", () => {
    gallery.listGallery(socket);
  });

  // KIT OPS

  socket.on("kit:new", (newKit: NewKit) => kit.newKit(socket, newKit));

  socket.on("kit:update", (updateKit: Kit) => kit.updateKit(socket, updateKit));

  socket.on("kit:list", () => {
    kit.listKit(socket);
  });

  socket.on("kit:add:employee", (updateKit: Kit) =>
    kit.addEmployeeKit(socket, updateKit)
  );

  // CALL OPS

  // STAGE OPS

  // REPORT OPS

  // GEOLOCAL TEST

  socket.on("coordinate:cep", (data) => cep.coordinate(socket, data));
  socket.on("weather:cep", (data) => weather.climate(socket, data));
};
