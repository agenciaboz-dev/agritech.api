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
const findEmployee = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield prisma.employee.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        console.log(`\nDados dos Employees:\n`);
        employees.forEach((employee, index) => {
            console.log(`Employee: ${index + 1}:\nID: ${employee.id}\nName: ${employee.user.name}\nUserID: ${employee.userid}\n`);
        });
    }
    catch (error) {
        console.error("Erro ao buscar lista de credenciais dos usuários:", error);
    }
    finally {
        yield prisma.$disconnect(); // Disconnect from the Prisma client
    }
});
findEmployee();
