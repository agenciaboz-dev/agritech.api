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
        producer: true,
        employee: {
            include: { bank_data: true, professional: true },
        },
        address: true,
    },
    employee: { bank_data: true, professional: true },
    producer: {
        tillage: { include: { address: true, coordinate: true, gallery: true } },
    },
    tillage: { address: true, coordinate: true, gallery: true },
    address: { use: true, tillage: true },
    bank: { employee: true },
    professional: { employee: true },
    coordinate: { tillage: true },
    gallery: {},
};
// username: "O nome de usuário já existe.",
//         email: "O e-mail já existe.",
//         cpf: "CPF já cadastrado.",
//         rg: "RG já cadastrado.",
//         cnpj: "CNPJ já cadastrado.",
//         voter_card: "Título de Eleitor já cadastrado.",
//         work_card: "Carteira de trabalho já existe.",
const user = {
    approve: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.update({
            where: { id },
            data: {
                approved: true,
                rejected: null,
            },
        });
    }),
    reject: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.update({
            where: { id },
            data: {
                approved: false,
                rejected: "Rejection Reason", // Set rejection reason
            },
        });
    }),
    exists: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findUnique({
            where: {
                username: data.username,
                email: data.email,
                cpf: data.cpf,
            },
        });
    }),
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield prisma.user.findFirst({
            where: {
                OR: [
                    { email: data.login },
                    { username: data.login },
                    { cpf: data.login },
                ],
                AND: { password: data.password },
            },
            //include: inclusions.user,
        });
    }),
    list: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.user.findMany({ include: inclusions.user }); }),
    find: {
        byId: (id) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { id },
                include: {
                    producer: true,
                    employee: {
                        include: {
                            bank_data: true,
                            professional: true,
                        },
                    },
                    address: true,
                },
            });
        }),
        username: (username) => __awaiter(void 0, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: { username },
                include: inclusions.user,
            });
        }),
    },
    new: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const birth = data.birth
            ? new Date(data.birth.split("/").reverse().join("/"))
            : undefined;
        console.log("Iniciando a criação do usuário...");
        const user = yield prisma.user.create({
            data: {
                birth: birth,
                cpf: data.cpf.replace(/\D/g, ""),
                email: (0, normalize_1.default)(data.email),
                name: data.name,
                password: data.password,
                phone: (_a = data.phone) === null || _a === void 0 ? void 0 : _a.replace(/\D/g, ""),
                username: (0, normalize_1.default)(data.username),
                isAdmin: data.isAdmin || false,
            },
        });
        console.log({ address: data.address });
        const address = yield prisma.address.create({
            data: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                cep: data.address.cep,
                complement: data.address.complement,
                district: data.address.district,
                uf: data.address.uf,
                userId: user.id,
            },
        });
        console.log("Usuário criado:", user);
        if (data.employee) {
            const employee = yield prisma.employee.create({
                data: {
                    gender: data.employee.gender,
                    relationship: data.employee.relationship,
                    nationality: data.employee.nationality,
                    residence: data.employee.residence,
                    rg: data.employee.rg,
                    voter_card: data.employee.voter_card,
                    work_card: data.employee.work_card,
                    military: data.employee.military,
                    userid: user.id,
                },
            });
            yield prisma.bank.create({
                data: {
                    account: data.employee.bank_data.account,
                    agency: data.employee.bank_data.agency,
                    name: data.employee.bank_data.name,
                    type: data.employee.bank_data.type,
                    employeeId: employee.id,
                },
            });
            console.log("Funcionário criado:", data.employee);
        }
        else if (data.producer) {
            yield prisma.producer.create({
                data: {
                    cnpj: data.producer.cnpj,
                    userid: user.id,
                },
            });
            console.log("Produtor criado:", data.producer);
        }
        //return await prisma.user.findFirst({ where: { id: user.id }, include: inclusions.user })
        return { user, address };
    }),
    update: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const birth = data.birth.split("/").reverse().join("/");
        const user = yield prisma.user.update({
            where: { id: data.id },
            data: {
                birth: new Date(birth),
                cpf: data.cpf.replace(/\D/g, ""),
                email: (0, normalize_1.default)(data.email),
                name: data.name,
                password: data.password,
                phone: (_b = data.phone) === null || _b === void 0 ? void 0 : _b.replace(/\D/g, ""),
                username: (0, normalize_1.default)(data.username),
                isAdmin: data.isAdmin || false,
            },
        });
        const address = yield prisma.address.update({
            where: { userId: data.id },
            data: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                cep: data.address.cep,
                complement: data.address.complement,
                district: data.address.district,
                uf: data.address.uf,
                userId: user.id,
            },
        });
        console.log("addreess update: ", data.address);
        if (data.employee) {
            const employee = yield prisma.employee.update({
                where: { userid: data.id },
                data: {
                    gender: data.employee.gender,
                    relationship: data.employee.relationship,
                    nationality: data.employee.nationality,
                    residence: data.employee.residence,
                    rg: data.employee.rg,
                    voter_card: data.employee.voter_card,
                    work_card: data.employee.work_card,
                    military: data.employee.military,
                    userid: user.id,
                },
            });
            yield prisma.bank.update({
                where: { employeeId: employee.id },
                data: {
                    account: data.employee.bank_data.account,
                    agency: data.employee.bank_data.agency,
                    name: data.employee.bank_data.name,
                    type: data.employee.bank_data.type,
                    employeeId: employee.id,
                },
            });
            console.log("Employee atualizado:", data.employee);
        }
        else if (data.producer) {
            yield prisma.producer.update({
                where: { userid: data.id },
                data: {
                    cnpj: data.producer.cnpj,
                    userid: user.id,
                },
            });
            console.log("Produtor atualizado:", data.producer);
        }
        return { user };
    }),
};
exports.default = { user };
// const jsonUpdate = {
//     {
//         "address": {
//           "cep": "65.454-654",
//           "city": "fdbnm",
//           "complement": "dsfghjk",
//           "district": "vbnnnmmn",
//           "id": 85,
//           "number": "6546",
//           "street": "dfgccghbn",
//           "uf": "AM",
//           "userId": 111
//         },
//         "birth": "1945-10-15T00:00:00.000Z",
//         "cpf": "854123",
//         "email": "branco@gmail.com",
//         "employee": {
//           "bank_data": {
//             "account": "145789",
//             "agency": "89797",
//             "employeeId": 27,
//             "id": 8,
//             "name": "Sanatnder",
//             "type": "corrente"
//           },
//           "gender": "Feminino",
//           "id": 27,
//           "military": "",
//           "nationality": "Braisleiro",
//           "professional": null,
//           "relationship": "uniao",
//           "residence": "",
//           "rg": "8465123",
//           "userid": 111,
//           "voter_card": "87456156445",
//           "work_card": "454545465"
//         },
//         "id": 111,
//         "image": null,
//         "image64": null,
//         "name": "Branco",
//         "password": "123",
//         "phone": "84564545564",
//         "producer": null,
//         "username": "white"
//       }
// }
