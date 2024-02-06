import { NewUser } from "../definitions/user";
import { PrismaClient } from "@prisma/client";
import normalize from "../normalize";
import { saveImage } from "../saveImage";

const prisma = new PrismaClient();

const inclusions = {
  user: {
    producer: {
      include: {
        tillage: {
          include: {
            address: true,
            location: true,
            gallery: true,
            talhao: { include: { calls: true } },
          },
        },
      },
    },
    employee: {
      include: {
        bank: true,
        professional: true,
        calendars: true,
        producers: true,
        kits: true,
      },
    },
    address: true,
  },

  employee: {
    bank: true,
    professional: true,
    calendars: true,
    producers: true,
  },
  producer: {
    tillage: { include: { address: true, location: true, gallery: true } },
  },
  tillage: {
    address: true,
    location: true,
    gallery: true,
    talhao: {
      include: { name: true, area: true, location: true, calls: true },
    },
  },
  address: { use: true, tillage: true },
  bank: { employee: true },
  professional: { employee: true },
  coordinate: { tillage: true },
  gallery: {},
};

const approve = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      approved: true,
      rejected: null,
    },
  });
};

const reject = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      approved: false,
      rejected: "Rejection Reason", // Set rejection reason
    },
  });
};

const exists = async (data: NewUser) => {
  return await prisma.user.findUnique({
    where: {
      username: data.username,
      email: data.email,
      cpf: data.cpf,
    },
  });
};

const login = async (data: { login: string; password: string }) => {
  return await prisma.user.findFirst({
    where: {
      OR: [
        { email: data.login },
        { username: data.login },
        { cpf: data.login },
      ],
      AND: { password: data.password },
    },
    include: inclusions.user,
  });
};

const pendingList = async () =>
  await prisma.user.findMany({
    where: { approved: false },
    include: inclusions.user,
  });

const approvedList = async () =>
  await prisma.user.findMany({
    where: { approved: true },
    include: inclusions.user,
  });

const findById = async (id: number) => {
  return await prisma.user.findFirst({
    where: { id },

    include: inclusions.user,
  });
};

const findByUsername = async (username: string) =>
  await prisma.user.findFirst({
    where: { username },
    include: inclusions.user,
  });

const newUser = async (data: NewUser) => {
  console.log(data);
  try {
    const birth = data.birth
      ? new Date(data.birth.split("/").reverse().join("/"))
      : undefined;

    let image: string | undefined;

    if (data.image?.file) {
      saveImage(`user/profile`, data.image.file, data.image.name);
      image = `user/profile/${data.image.name}`;
    }

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
        approved: data.approved, // <<<<< gambiarrei
        rejected: null,
        office: data.office,

        image: image,
      },
      include: inclusions.user,
    });

    const address = await prisma.address.create({
      data: {
        street: data.address.street,
        number: data.address.number,
        city: data.address.city,
        cep: data.address.cep,
        adjunct: data.address.adjunct || "",
        district: data.address.district,
        uf: data.address.uf,
        userId: user.id,
      },
    });
    console.log("Usuário criado:", user);
    console.log({ address: data.address });

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

      // await prisma.bank.create({
      //     data: {
      //         account: data.employee.bank_data.account,
      //         agency: data.employee.bank_data.agency,
      //         name: data.employee.bank_data.name,
      //         type: data.employee.bank_data.type,
      //         employeeId: employee.id,
      //     },
      // })

      console.log("Funcionário criado:", data.employee);
    } else if (data.producer) {
      // console.log({ "Recebendo no Back:": data })
      const producer = await prisma.producer.create({
        data: {
          cnpj: data.producer.cnpj,
          contract: data.producer.contract,
          hectarePrice: data.producer.hectarePrice,
          employeeId: data.producer.employeeId,
          tillage: data.producer.tillage,
          userid: user.id,
        },
      });
      console.log("Produtor criado:", data.producer);
    }
    return await prisma.user.findFirst({
      where: { id: user.id },
      include: inclusions.user,
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (data: NewUser & { id: number }) => {
  const birth = data.birth.split("/").reverse().join("/");
  try {
    let image: string | undefined;

    if (data.image?.file) {
      saveImage(`user/profile`, data.image.file, data.image.name);
      image = `user/profile/${data.image.name}`;
    }

    const address = await prisma.address.update({
      where: { userId: data.id },
      data: {
        street: data.address.street,
        number: data.address.number,
        city: data.address.city,
        cep: data.address.cep,
        adjunct: data.address.adjunct,
        district: data.address.district,
        uf: data.address.uf,
        userId: data.id,
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
          userid: data.id,
        },
      });
      // await prisma.bank.update({
      //     where: { employeeId: employee.id },
      //     data: {
      //         account: data.employee.bank_data.account,
      //         agency: data.employee.bank_data.agency,
      //         name: data.employee.bank_data.name,
      //         type: data.employee.bank_data.type,
      //         employeeId: employee.id,
      //     },
      // })

      console.log("Employee atualizado:", data.employee);
    } else if (data.producer) {
      await prisma.producer.update({
        where: { userid: data.id },
        data: {
          cnpj: data.producer.cnpj,
          hectarePrice: data.producer.hectarePrice,
          userid: data.id,
        },
      });
      console.log("Produtor atualizado:", data.producer);
    }

    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        birth: new Date(birth),
        cpf: data.cpf.replace(/\D/g, ""),
        email: normalize(data.email),
        name: data.name,
        password: data.password,
        phone: data.phone?.replace(/\D/g, ""),
        image: image,
        username: normalize(data.username),
        isAdmin: data.isAdmin || false,
        approved: data.isAdmin,
      },
      include: inclusions.user,
    });

    return { user };
  } catch (error) {
    console.log(error);
  }
};

const toggleAdmin = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      isAdmin: true,
    },
  });
  return await prisma.user.update({
    where: { id },
    data: {
      isAdmin: !user?.isAdmin,
    },
    include: inclusions.user,
  });
};

const toggleManager = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      isManager: true,
    },
  });
  return await prisma.user.update({
    where: { id },
    data: {
      isManager: !user?.isManager,
    },
    include: inclusions.user,
  });
};

export default {
  inclusions,
  approve,
  reject,
  exists,
  login,
  pendingList,
  approvedList,
  findById,
  findByUsername,
  newUser,
  update,
  toggleAdmin,
  toggleManager,
};
