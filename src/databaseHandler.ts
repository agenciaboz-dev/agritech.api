import { getIoInstance } from "./io/socket"
import { NewUser } from "./definitions/newUser"
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
} from "@prisma/client"

const prisma = new PrismaClient()

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
}

const user = {
    login: async (data: { login: string; password: string }) => {
        return await prisma.user.findFirst({
            where: {
                OR: [{ email: data.login }, { username: data.login }, { cpf: data.login }],
                AND: { password: data.password },
            },
            include: inclusions.user,
        })
    },

    list: async () => await prisma.user.findMany({ include: inclusions.user }),

    find: {
        username: async (username: string) => await prisma.user.findFirst({ where: { username }, include: inclusions.user }),
    },

    new: async (data: NewUser) => {
        const birth = data.birth.split("/").reverse().join("/")

        const user = await prisma.user.create({
            data: {
                birth: new Date(birth),
                cpf: data.cpf.replace(/\D/g, ""),
                email: data.email,
                name: data.name,
                password: data.username.toLowerCase(),
                phone: data.phone.replace(/\D/g, ""),
                username: data.username.toLowerCase(),
                address: {
                    create: data.address,
                },
            },
            include: inclusions.user,
        })

        if (data.employee) {
            await prisma.employee.create({
                data: {
                    ...data.employee,
                    userid: user.id,
                },
            })
        }
        if (data.producer) {
            await prisma.producer.create({
                data: {
                    ...data.producer,
                    userid: user.id,
                },
            })
        }
        return user
    },
}

export default { user }
