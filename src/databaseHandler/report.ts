// import { CloseCall, OpenCall } from "../definitions/call";
import { Report, PrismaClient } from "@prisma/client"
import { NewReport } from "../definitions/report"
import { connect } from "http2"

const prisma = new PrismaClient()

const create = async (data: NewReport) => {
    console.log("Iniciando a criação do relatório...")
    const report = await prisma.report.create({
        data: {
            callId: data.callId,
            producer: {
                connect: {
                    cnpj: data.producer.cnpj,
                    // call: data.producer.call,
                    contract: data.producer.contract,
                },
            },
        },
    })

    // const producer = await prisma.producer.create({
    //   data: {
    //     cnpj: data.producer.cnpj,
    //     contract: data.producer.contract,
    //     userid: data.producer.userid,
    //     employeeId: data.producer.employeeId,
    //     reportId: data.producer.reportId,
    //     hectarePrice: data.producer.hectarePrice,
    //   },
    // });

    const operation = await prisma.operation.create({
        data: {
            service: data.operation.service,
            culture: data.operation.culture,
            areaMap: data.operation.areaMap,
            equipment: data.operation.equipment,
            model: data.operation.model,
            reportId: data.operation.reportId,
        },
    })

    if (data.material) {
        const materialsList = await Promise.all(
            data.material.map(async (material) => {
                return await prisma.material.create({
                    data: {
                        talhao: material.talhao,
                        area: material.area,
                        product: material.product,
                        dosage: material.dosage,
                        classification: material.classification,
                        total: material.total,
                        removed: material.removed,
                        applied: material.applied,
                        returned: material.returned,
                        comments: material.comments,
                        reportId: material.reportId,
                    },
                })
            })
        )
    }

    console.log({ report, operation })
    console.log("Report Criado aberto:", report)
    return report
}

const update = async (data: Report) => {
    console.log("Initiating Report Update...")
    const report = await prisma.report.update({
        where: { id: data.id },
        data: {
            callId: data.callId,
        },
    })
    console.log("Report updated:", report)
    return report
}

const find = async (id: number) => {
    return await prisma.report.findUnique({
        where: { id },
        include: {
            producer: true,
            operation: true,
            treatment: true,
            material: true,
            techReport: true,
        },
    })
}

const list = async () => {
    return await prisma.report.findMany({
        include: {
            producer: true,
            operation: true,
            treatment: true,
            material: true,
            techReport: true,
        },
    })
}

export default {
    create,
    update,
    find,
    list,
}
