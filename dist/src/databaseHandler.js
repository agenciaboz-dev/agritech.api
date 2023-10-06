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
const client_1 = require("@prisma/client");
const normalize_1 = __importDefault(require("./normalize"));
const prisma = new client_1.PrismaClient();
const inclusions = {
    user: {
        producer: {
            include: { tillage: { include: { address: true, coordinate: true, gallery: true } } },
        },
        employee: { include: { bank: true, professional: true } },
        address: true,
    },
    employee: { bank: true, professional: true },
    producer: { tillage: { include: { address: true, coordinate: true, gallery: true } } },
    tillage: { address: true, coordinate: true, gallery: true },
    address: { use: true, tillage: true },
    bank: { employee: true },
    professional: { employee: true },
    coordinate: { tillage: true },
    gallery: {},
};
const user = {
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findFirst({
            where: {
                OR: [{ email: data.login }, { username: data.login }, { cpf: data.login }],
                AND: { password: data.password },
            },
            // include: inclusions.user,
        });
    }),
    list: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.user.findMany({ include: inclusions.user }); }),
    find: {
        username: (username) => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.user.findFirst({ where: { username }, include: inclusions.user }); }),
    },
    new: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const birth = data.birth ? new Date(data.birth.split("/").reverse().join("/")) : undefined;
        const user = yield prisma.user.create({
            data: {
                birth: birth,
                cpf: data.cpf.replace(/\D/g, ""),
                email: (0, normalize_1.default)(data.email),
                name: data.name,
                password: data.password,
                phone: (_a = data.phone) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, ""),
                username: (0, normalize_1.default)(data.username),
            },
        });
        // const address = await prisma.address.create({ data: { ...data.address, userId: user.id } })
        // if (data.employee) {
        //     await prisma.employee.create({
        //         data: {
        //             ...data.employee,
        //             userid: user.id,
        //         },
        //     })
        // } else if (data.producer) {
        //     await prisma.producer.create({
        //         data: {
        //             ...data.producer,
        //             userid: user.id,
        //         },
        //     })
        // }
        // return await prisma.user.findFirst({ where: { id: user.id }, include: inclusions.user })
        return user;
    }),
};
exports.default = { user };
