import { NewKit, ManageKitMembers } from "../types/kit"
import { Kit, PrismaClient } from "@prisma/client"
import { saveImage } from "../tools/saveImage"

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
    tillage: {
        address: true,
        location: true,
        gallery: true,
        talhao: { include: { name: true, area: true, location: true } },
    },

    address: { use: true, tillage: true },
    location: { tillage: true, talhao: true },
    gallery: {},
    kit: {
        objects: true,
        employees: { include: { user: true } },
        calls: { include: { talhao: true } },
        calendar: true,
    },
}
const create = async (data: NewKit) => {
    console.log(data)

    let image: string | undefined

    if (data.image?.file) {
        image = saveImage(`kit/`, data.image.file, data.image.name)
    }

    const kit = await prisma.kit.create({
        data: {
            image: image,
            name: data.name,
            description: data.description,
            hectareDay: data.hectareDay,

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

    const calendar = await prisma.calendar.create({
        data: {
            name: `Calendário do Kit ${kit.name}`,
            kitId: kit.id,
        },
    })

    console.log("Kit:", kit)
    console.log("Calendario:", calendar)
    return await prisma.kit.findFirst({
        where: { id: kit.id },
        include: inclusions.kit,
    })
}

const update = async (data: NewKit) => {
    console.log(data)
    let image: string | undefined

    if (data.image?.file) {
        image = saveImage(`kit/`, data.image.file, data.image.name)
    }

    const kit = await prisma.kit.update({
        where: { id: data.id },
        data: {
            image: image,
            name: data.name,
            description: data.description,
            active: data.active,
            hectareDay: data.hectareDay,
            objects: {
                deleteMany: { kitId: data.id },
                create: data.objects?.map((item) => ({
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity,
                })),
            },
            employees: {
                disconnect: data.employees?.map((employee) => ({ id: employee.id })),
                connect: data.employees?.map((employee) => ({ id: employee.id })),
            },
        },
        include: {
            calendar: true,
            calls: true,
            objects: true,
            employees: { include: { user: true } },
        },
    })
    console.log(data)
    return kit
}

const list = async () => {
    return await prisma.kit.findMany({
        include: {
            objects: true,
            employees: true,
            calls: { include: { talhao: true } },
        },
    })
}

const toggle = async (id: number) => {
    const kit = await prisma.kit.findUnique({
        where: { id },
        select: {
            active: true,
        },
    })
    return await prisma.kit.update({
        where: { id },
        data: {
            active: !kit?.active,
        },
        include: inclusions.kit,
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
    console.log(kit)

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
    console.log(kit)
    return kit
}

export default {
    create,
    update,
    list,
    toggle,
    add,
    remove,
}
