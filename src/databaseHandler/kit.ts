import { NewKit, ManageKitMembers } from "../definitions/kit"
import { Employee, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const inclusions = {
    user: {
        producer: {
            include: {
                tillage: { include: { address: true, location: true, gallery: true } },
            },
        },
        employee: {
            include: {
                bank: true,
                professional: true,
            },
        },
        address: true,
    },
    tillage: { address: true, location: true, gallery: true },
    address: { use: true, tillage: true },
    location: { tillage: true },
    gallery: {},
    kit: {
        objects: true,
        employees: true,
        calls: true,
    },
}
const create = async (data: NewKit) => {
    console.log("Iniciando a criação do kit...")
    const kit = await prisma.kit.create({
        data: {
            image: data.image,
            image64: data.image64,
            name: data.name,
            description: data.description,
        },
    })
    if (data.employees) {
        const employeesList = await Promise.all(
            data.employees.map(async (employee: Employee) => {
                return await prisma.employee.update({
                    where: { id: employee.id },
                    data: { kitId: kit.id },
                })
            })
        )
    }

    console.log("Kit criado:", kit)
    return { kit }
}

const update = async (data: NewKit & { id: number }) => {
    const kit = await prisma.kit.update({
        where: { id: data.id },
        data: {
            image: data.image,
            image64: data.image64,
            name: data.name,
            description: data.description,
        },
    })
    console.log("Kit update: ", data)

    return kit
}

const list = async () => {
    return await prisma.kit.findMany({
        include: {
            calendar: true,
            calls: true,
            employees: true,
            objects: true,
        },
    })
}

const add = async (data: ManageKitMembers) => {
    const kit = await prisma.kit.update({
        where: { id: data.kitId },
        data: {
            employees: {
                connect: { id: data.employeeId },
            },
        },
        include: {
            employees: true,
        },
    })
    console.log("Kit update: ", data)

    return kit
}

const remove = async (data: ManageKitMembers) => {
    const kit = await prisma.kit.update({
        where: { id: data.kitId },
        data: {
            employees: {
                disconnect: { id: data.employeeId },
            },
        },
        include: {
            employees: true,
        },
    })
    console.log("Kit update: ", data)
    return kit
}

export default {
    create,
    update,
    list,
    add,
    remove,
}
