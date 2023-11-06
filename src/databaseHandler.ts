import { getIoInstance } from "./io/socket";
import { NewUser } from "./definitions/newUser";
import {
  User,
  Employee,
  Producer,
  Address,
  Bank,
  Professional,
  Tillage,
  Coordinate,
  Gallery,
  PrismaClient,
} from "@prisma/client";
import normalize from "./normalize";

const prisma = new PrismaClient();

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

const user = {
  login: async (data: { login: string; password: string }) => {
    return await prisma.user.findFirst({
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
  },

  list: async () => await prisma.user.findMany({ include: inclusions.user }),

  find: {
    byId: async (id: number) => {
      return await prisma.user.findFirst({
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
    },
    username: async (username: string) =>
      await prisma.user.findFirst({
        where: { username },
        include: inclusions.user,
      }),
  },

  new: async (data: NewUser) => {
    const birth = data.birth
      ? new Date(data.birth.split("/").reverse().join("/"))
      : undefined;

    console.log("Iniciando a criação do usuário...");
    const user = await prisma.user.create({
      data: {
        birth: birth,
        cpf: data.cpf.replace(/\D/g, ""),
        email: normalize(data.email),
        name: data.name,
        password: data.password,
        phone: data.phone?.replace(/\D/g, ""),
        username: normalize(data.username),
        isAdmin: data.isAdmin || false,
      },
    });
    console.log({ address: data.address });

    const address = await prisma.address.create({
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
      const employee = await prisma.employee.create({
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

      await prisma.bank.create({
        data: {
          account: data.employee.bank_data.account,
          agency: data.employee.bank_data.agency,
          name: data.employee.bank_data.name,
          type: data.employee.bank_data.type,
          employeeId: employee.id,
        },
      });
      console.log("Funcionário criado:", data.employee);
    } else if (data.producer) {
      await prisma.producer.create({
        data: {
          cnpj: data.producer.cnpj,
          userid: user.id,
        },
      });
      console.log("Produtor criado:", data.producer);
    }
    //return await prisma.user.findFirst({ where: { id: user.id }, include: inclusions.user })
    return { user, address };
  },

  update: async (data: NewUser & { id: number }) => {
    const birth = data.birth.split("/").reverse().join("/");

    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        birth: new Date(birth),
        cpf: data.cpf.replace(/\D/g, ""),
        email: normalize(data.email),
        name: data.name,
        password: data.password,
        phone: data.phone?.replace(/\D/g, ""),
        username: normalize(data.username),
        isAdmin: data.isAdmin || false,
      },
    });

    const address = await prisma.address.update({
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
      const employee = await prisma.employee.update({
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
      await prisma.bank.update({
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
    } else if (data.producer) {
      await prisma.producer.update({
        where: { userid: data.id },
        data: {
          cnpj: data.producer.cnpj,
          userid: user.id,
        },
      });
      console.log("Produtor atualizado:", data.producer);
    }
    return { user };
  },
};

export default { user };

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
