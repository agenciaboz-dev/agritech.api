"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("./socket");
const databaseHandler_1 = __importDefault(require("../databaseHandler"));
const prisma = databaseHandler_1.default;
const logout = (socket, clients, user) => __awaiter(void 0, void 0, void 0, function* () {
    const io = (0, socket_1.getIoInstance)();
    io.emit("user:disconnect", user);
    clients.remove(clients === null || clients === void 0 ? void 0 : clients.get(socket));
});
const handleLogin = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield databaseHandler_1.default.user.login(data);
    if (user) {
        // Se o login for bem-sucedido, emitimos um evento "user:login:success" com os detalhes do usuário.
        socket.emit("user:login:success", user);
    }
    else {
        // Se o login falhar, emitimos um evento "user:login:failed" com uma mensagem de erro.
        socket.emit("user:login:failed", { error: "Credenciais inválidas." });
    }
});
const newUser = (socket, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(newUser);
    const user = yield prisma.user.new(newUser);
    if (user) {
        socket.emit("user:signup:success", user);
        socket.broadcast.emit("user:new", user);
    }
    else {
        socket.emit("user:signup:failed");
    }
});
exports.default = { logout, newUser, handleLogin };
