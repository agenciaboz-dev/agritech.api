"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSocket = exports.clientList = exports.getIoInstance = exports.initializeIoServer = void 0;
const socket_io_1 = require("socket.io");
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
let io = null;
const initializeIoServer = (server) => {
    io = new socket_io_1.Server(server, {
        cors: { origin: "*" },
        maxHttpBufferSize: 1e8,
    });
};
exports.initializeIoServer = initializeIoServer;
const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.");
    }
    return io;
};
exports.getIoInstance = getIoInstance;
exports.clientList = [];
const get = (socket) => exports.clientList.find((client) => client.socket == socket);
const find = (id) => exports.clientList.find((client) => client.user.id == id);
const getUser = (client) => client.user;
const list = () => exports.clientList.map((client) => client.user);
const remove = (client) => {
    if (!client)
        return;
    exports.clientList = exports.clientList.filter((item) => item.socket != client.socket);
};
const add = (client) => {
    const exists = find(client.user.id);
    if (exists)
        remove(client);
    exports.clientList.push(client);
};
const update = (client, user) => (exports.clientList = [
    ...exports.clientList.filter((item) => item.socket != client.socket),
    Object.assign(Object.assign({}, client), { user }),
]);
const handleSocket = (socket) => {
    const io = (0, exports.getIoInstance)();
    const clients = {
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
            user_1.default.logout(socket, clients, client.user);
        }
    });
    socket.on("user:logout", (data) => user_1.default.logout(socket, clients, data));
    socket.on("user:signup", (newUser) => user_1.default.newUser(socket, newUser));
    socket.on("user:login", (data) => user_1.default.handleLogin(socket, data));
    socket.on("user:find", (userId) => user_1.default.findUser(socket, { userId }));
    socket.on("user:list", (userId) => user_1.default.findUser(socket, { userId }));
    socket.on("user:update", (updateUser, userId) => user_1.default.updateUser(socket, updateUser));
    // TESTES, DEPOIS ISSO VAI SER MUDADO
    socket.on("admin:signup", (userNew) => admin_1.default.userNew(socket, userNew));
    socket.on("admin:reject", (id) => admin_1.default.reject(socket, id));
    socket.on("admin:approve", (id) => admin_1.default.approve(socket, id));
};
exports.handleSocket = handleSocket;
