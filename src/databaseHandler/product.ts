import { PrismaClient } from "@prisma/client"
import { NewProduct } from "../types/product"

const prisma = new PrismaClient()

const create = async (data: NewProduct) => {
    console.log(data)
    const product = await prisma.product.create({
        data: {
            name: data.name,
            dosage: data.dosage,
            unit: data.unit,
            treatmentId: data.treatmentId,
        },
    })
    console.log({ product })
    return { product }
}

const update = async (data: NewProduct) => {
    const product = await prisma.product.update({
        where: { id: data.id },
        data: {
            name: data.name,
            dosage: data.dosage,
            unit: data.unit,
            treatmentId: data.treatmentId,
        },
    })
    console.log(product)
    return { product }
}

const find = async (id: number) => {
    return await prisma.product.findUnique({ where: { id } })
}

const list = async () => {
    return await prisma.product.findMany({})
}

export default {
    create,
    update,
    find,
    list,
}
