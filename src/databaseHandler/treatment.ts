import { NewTreatment } from "../types/treatment"
import { Treatment } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import { report_include } from "./report"

const prisma = new PrismaClient()

const create = async (data: NewTreatment) => {
    console.log("Initiating Treatment Creation...")
    const treatment = await prisma.treatment.create({
        data: {
            reportId: data.reportId,
        },
    })
    console.log({ Tratamento: treatment })

    console.log("Treatment Created:", treatment)
    return treatment
}

const update = async (data: NewTreatment) => {
    const report = await prisma.report.update({
        where: { id: data.reportId },
        data: {
            treatment: {
                update: {
                    products: {
                        deleteMany: { treatmentId: data.id },
                        create: data.products.map((product) => ({
                            name: product.name,
                            dosage: product.dosage,
                            unit: product.unit,
                        })),
                    },
                },
            },
        },
        include: report_include,
    })

    return {
        ...report,
        call: {
            ...report.call,
            talhao: { ...report.call.talhao, cover: "", tillage: { ...report.call.talhao.tillage, cover: "" } },
        },
    }
}

const find = async (id: number) => {
    return await prisma.treatment.findUnique({ where: { id } })
}

const list = async () => {
    return await prisma.treatment.findMany({})
}

export default {
    create,
    update,
    find,
    list,
}
