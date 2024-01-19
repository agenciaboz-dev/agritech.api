import { NewKit, ManageKitMembers } from "../definitions/kit"
import { Kit, PrismaClient } from "@prisma/client"

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
                calendars: true,
                producers: true,
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
            employees: {
                connect: data.employees?.map((employee) => ({ id: employee.id })),
            },
        },
        include: {
            employees: true, // Certifique-se de incluir os employees no resultado
        },
    })
    if (data.objects) {
        const objectsList = await Promise.all(
            data.objects.map(async (object) => {
                return await prisma.object.create({
                    data: {
                        name: object.name,
                        description: object.description,
                        quantity: object.quantity,
                        kitId: kit.id,
                    },
                })
            })
        )
    }

    console.log("Kit criado:", kit)
    return await prisma.kit.findFirst({
        where: { id: kit.id },
        include: inclusions.kit,
    })
}

const update = async (data: NewKit & { id: number }) => {
    const kit = await prisma.kit.update({
        where: { id: data.id },
        data: {
            image: data.image,
            image64: data.image64,
            name: data.name,
            description: data.description,
            active: data.active,
        },
    })
    console.log("Kit update: ", data)

    return kit
}

const list = async () => {
    return await prisma.kit.findMany({
        include: inclusions.kit,
    })
}

const activate = async (data: Kit) => {
    const kit = await prisma.kit.update({
        where: { id: data.id },
        data: {
            name: data.name,
            active: data.active,
        },
    })
    console.log("Kit activation: ", data)

    return kit
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
    activate,
    add,
    remove,
}
