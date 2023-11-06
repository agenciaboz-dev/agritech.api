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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv").config();
const prisma = new client_1.PrismaClient();
const findUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = (yield prisma.user.findMany()).flatMap((user) => user);
        console.log(`\nCREDENCIAIS DOS USUARIOS:\n`);
        credentials.forEach((user, index) => {
            console.log(`User: ${user.name} \nID: ${user.id} \nLogin: ${user.email} \nPassword: ${user.password}\nAdmin:${user.isAdmin}\n`);
        });
    }
    catch (error) {
        console.error("Erro ao buscar lista de credenciais dos usuários:", error);
    }
    finally {
        yield prisma.$disconnect(); // Disconnect from the Prisma client
    }
});
findUsers();
