import { NewCoordinate } from "../types/coordinate"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const create = async (data: NewCoordinate) => {
    console.log(data)
    const coordinate = await prisma.coordinate.create({
        data: {
            x: data.x,
            y: data.y,
            tillageId: data.tillageId,
            talhaoId: data.talhaoId,
        },
    })
    console.log({ coordinate })
    return { coordinate }
}

const update = async (data: NewCoordinate) => {
    console.log(data)
    const coordinate = await prisma.coordinate.update({
        where: { id: data.id },
        data: {
            x: data.x,
            y: data.y,
        },
    })
    console.log(coordinate)
    return { coordinate }
}

const find = async (id: number) => {
    return await prisma.coordinate.findUnique({ where: { id } })
}

const list = async () => {
    return await prisma.coordinate.findMany({
        include: {
            tillage: true,
            talhao: true,
        },
    })
}

export default {
    create,
    update,
    find,
    list,
}
