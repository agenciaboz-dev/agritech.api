import { NewMaterial } from "../definitions/material"
import { Material } from "@prisma/client"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const create = async (data: NewMaterial) => {
    const material = await prisma.material.create({
        data: {
            talhao: data.talhao,
            area: data.area,
            product: data.product,
            dosage: data.dosage,
            classification: data.classification,
            total: data.total,
            removed: data.removed,
            applied: data.applied,
            returned: data.returned,
            comments: data.comments,
            reportId: data.reportId,
        },
        include: { report: true },
    })
    console.log({ material })

    return material
}

const update = async (data: Material) => {
    const material = await prisma.material.update({
        where: { id: data.id },
        data: {
            talhao: data.talhao,
            area: data.area,
            product: data.product,
            dosage: data.dosage,
            classification: data.classification,
            total: data.total,
            removed: data.removed,
            applied: data.applied,
            returned: data.returned,
            comments: data.comments,
            reportId: data.reportId,
        },
        include: {
            report: {
                include: { operation: true, treatment: true, techReport: true, material: true, stages: true, call: true },
            },
        },
    })
    console.log(material)
    return material
}

const list = async () => {
    return await prisma.material.findMany({
        include: {
            report: true,
        },
    })
}

const find = async (id: number) => {
    return await prisma.material.findUnique({
        where: { id },
        include: {
            report: true,
        },
    })
}

export default {
    create,
    update,
    list,
    find,
}
