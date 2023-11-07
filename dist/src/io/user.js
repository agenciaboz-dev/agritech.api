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
        socket.emit("user:login:success", user);
    }
    else {
        // If the login fails, emit a "user:login:failed" event with an error message.
        socket.emit("user:login:failed", { error: "Credenciais inválidas." });
    }
});
const newUser = (socket, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(newUser);
    try {
        const user = yield prisma.user.new(newUser);
        if (user) {
            socket.emit("user:signup:success", user);
            socket.broadcast.emit("user:new", user);
        }
        else {
            socket.emit("user:signup:failed");
        }
    }
    catch (error) {
        console.log(error);
        if (error.code === "P2002" && error.meta) {
            // Mapeamento de campos para mensagens de erro
            const fieldErrorMap = {
                username: "O nome de usuário já existe.",
                email: "O e-mail já existe.",
                cpf: "CPF já cadastrado.",
                rg: "RG já cadastrado.",
                cnpj: "CNPJ já cadastrado.",
                voter_card: "Título de Eleitor já cadastrado.",
                work_card: "Carteira de trabalho já existe.",
            };
            // Verifique qual campo causou o erro
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:signup:failed", { error: fieldErrorMap[field] });
                    break; // Saia do loop assim que encontrar a correspondência
                }
            }
        }
    }
});
const findUser = (socket, data) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = data.userId;
    console.log(`Received user:find event for user ID: ${userId}`);
    try {
        const userDetails = yield prisma.user.find.byId(userId);
        console.log(userDetails);
        if (userDetails) {
            console.log(`Found user details for ID: ${userId}`);
            socket.emit("user:find:success", userDetails);
        }
        else {
            console.log(`No user found for ID: ${userId}`);
            socket.emit("user:find:failed", { error: "Usuário não encontrado." });
        }
    }
    catch (error) {
        console.error(`Error fetching user for ID: ${userId}. Error: ${error}`);
        socket.emit("user:find:error", { error: error });
    }
});
const updateUser = (socket, updateUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Usuário atualizado:", updateUser);
    try {
        const user = yield prisma.user.update(updateUser);
        if (user) {
            socket.emit("user:update:success", user);
            socket.broadcast.emit("user:update:success", user);
        }
        else {
            socket.emit("user:update:failed");
        }
    }
    catch (error) {
        console.log(error);
        socket.emit("user:update:failed", { error: error });
    }
});
exports.default = {
    logout,
    newUser,
    handleLogin,
    findUser,
    updateUser,
    // listUser,
};
