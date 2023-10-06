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
import normalize from "./normalize"

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
            // include: inclusions.user,
        })
    },

    list: async () => await prisma.user.findMany({ include: inclusions.user }),

    find: {
        username: async (username: string) => await prisma.user.findFirst({ where: { username }, include: inclusions.user }),
    },

    new: async (data: NewUser) => {
        const birth = data.birth ? new Date(data.birth.split("/").reverse().join("/")) : undefined

        const user = await prisma.user.create({
            data: {
                birth: birth,
                cpf: data.cpf.replace(/\D/g, ""),
                email: normalize(data.email),
                name: data.name,
                password: data.password,
                phone: data.phone?.replace(/\D/g, ""),
                username: normalize(data.username),
            },
        })

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
        return user
    },
}

export default { user }
