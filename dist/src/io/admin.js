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
const databaseHandler_1 = __importDefault(require("../databaseHandler"));
const prisma = databaseHandler_1.default;
const userNew = (socket, userNew // Change 'any' to 'NewUser' to ensure type safety
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check if a user with the same data already exists
        const existingUser = yield prisma.user.exists(userNew);
        if (existingUser) {
            // User with the same data already exists
            socket.emit("application:status:failed", {
                error: "Conflicting User Data",
            });
        }
        else {
            // No user with the same data found, proceed with user creation
            const pendingUser = yield prisma.user.new(userNew);
            // Emit success event
            socket.emit("application:status:review", pendingUser);
        }
    }
    catch (error) {
        console.log(error);
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap = {
                username: "The username already exists.",
                email: "The email already exists.",
                cpf: "CPF already registered.",
                rg: "RG already registered.",
                cnpj: "CNPJ already registered.",
                voter_card: "Voter card already registered.",
                work_card: "Work card already exists.",
            };
            // Check which field caused the error
            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("application:status:failed", {
                        error: fieldErrorMap[field],
                    });
                    break;
                }
            }
        }
    }
});
const approve = (socket, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.approve(id);
        if (user) {
            socket.emit("application:status:approved", user);
        }
        else {
            socket.emit("application:aproval:error", {
                error: "Approval Error",
            });
        }
        // Notify the user that their application is approved
    }
    catch (error) {
        console.log(error);
    }
});
const reject = (socket, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.reject(id);
        if (user) {
            socket.emit("application:status:rejected", user);
        }
        else {
            socket.emit("application:rejection:error", {
                error: "Erro Rejected",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = {
    userNew,
    approve,
    reject,
};
