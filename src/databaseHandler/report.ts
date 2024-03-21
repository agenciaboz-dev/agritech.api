// import { CloseCall, OpenCall } from "../definitions/call";
import { Prisma, PrismaClient } from "@prisma/client"
import { NewReport } from "../types/report"
import { NewMaterial } from "../types/material"

export const report_include = Prisma.validator<Prisma.ReportInclude>()({
    operation: true,
    treatment: { include: { products: true } },
    material: true,
    techReport: { include: { flight: true } },
    call: {
        include: {
            producer: { include: { user: true } },
            kit: { include: { employees: { include: { user: true } } } },
            talhao: { include: { tillage: { include: { address: true } } } },
            reports: true,
        },
    },
})

export type ReportClosingType = Prisma.ReportGetPayload<{ include: typeof report_include }>

const prisma = new PrismaClient()

const create = async (call_id: number) =>
    await prisma.report.create({
        data: {
            callId: call_id,
            stage: 1,
            date: new Date().getTime().toString(),
            hour: new Date().getTime().toString(),

            operation: {
                create: {
                    service: "",
                    culture: "",
                    areaMap: 0,
                    equipment: "",
                    model: "",
                },
            },
            material: { create: [] },
            techReport: {
                create: {
                    date: "",
                    init: "",
                    finish: "",
                    comments: "",
                    flight: { create: [] },
                },
            },
            treatment: {
                create: {
                    products: { create: [] },
                },
            },
        },
        include: report_include,
    })

const update = async (data: { reportId: number; totalPrice: number; areaTrabalhada: number; materials: NewMaterial[] }) => {
    console.log(data)

    const report = await prisma.report.update({
        where: { id: data.reportId },
        data: {
            areaTrabalhada: data.areaTrabalhada,
            totalPrice: data.totalPrice,
            material: {
                deleteMany: { reportId: data.reportId },
                create: data.materials.map((material) => ({
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
                })),
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
const approve = async (reportId: number) => {
    const report = await prisma.report.update({
        where: { id: reportId },
        data: { approved: true },
        include: {
            operation: true,
            treatment: { include: { products: true } },
            material: true,
            techReport: { include: { flight: true } },
            call: {
                include: {
                    producer: { include: { user: true } },
                    kit: { include: { employees: { include: { user: true } } } },
                },
            },
        },
    })

    console.log(report)
    return report
}
const close = async (reportId: number) => {
    const report = await prisma.report.update({
        where: { id: reportId },
        data: { close: new Date().getTime().toString() },
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
// export const closing_report_include = Prisma.validator<Prisma.ReportInclude>()({
//     material: true,
//     operation: true,
//     treatment: { include: { products: true } },
//     techReport: { include: { flight: true } },
//     call: {
//         include: {
//             talhao: { include: { tillage: { include: { address: true } } } },
//             kit: { include: { employees: { include: { user: true } } } },
//             producer: { include: { user: true } },
//             reports: true,
//         },
//     },
// })

const find = async (id: number) => {
    return await prisma.report.findUnique({
        where: { id },
        include: {
            operation: true,
            treatment: true,
            material: true,
            techReport: true,
        },
    })
}

const list = async () => {
    const reports = await prisma.report.findMany({
        include: report_include,
    })

    return reports.map((item) => ({
        ...item,
        call: {
            ...item.call,
            talhao: { ...item.call.talhao, cover: "", tillage: { ...item.call.talhao.tillage, cover: "" } },
        },
    }))
}

export default {
    create,
    update,
    find,
    list,
    approve,
    close,
}
