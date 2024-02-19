// import { CloseCall, OpenCall } from "../definitions/call";
import { PrismaClient } from "@prisma/client"
import { NewReport } from "../definitions/report"
import { NewMaterial } from "../definitions/material"
import tillage from "./tillage"

const prisma = new PrismaClient()

const create = async (data: NewReport) => {
    console.log(data)

    const report = await prisma.report.create({
        data: {
            call: { connect: { id: data.callId } },

            areaTrabalhada: data.areaTrabalhada,
            date: new Date().getTime().toString(),
            hour: new Date().getTime().toString(),

            operation: {
                create: {
                    service: data.operation.service,
                    culture: data.operation.culture,
                    areaMap: data.operation.areaMap,
                    equipment: data.operation.equipment,
                    model: data.operation.model,
                },
            },
            material: {
                create: data.material.map((material) => ({
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
            techReport: {
                create: {
                    date: data.techReport.date,
                    init: data.techReport.init,
                    finish: data.techReport.finish,
                    comments: data.techReport.comments,
                    flight: {
                        create: data.techReport.flight.map((flight) => ({
                            humidity: flight.humidity,
                            temperature: flight.temperature,
                            wind_velocity: flight.wind_velocity,
                            height: flight.height,
                            faixa: flight.faixa,
                            flight_velocity: flight.flight_velocity,
                            tank_volume: flight.tank_volume,
                            rate: flight.rate,
                            performance: flight.performance,
                        })),
                    },
                },
            },
            treatment: {
                create: {
                    products: {
                        create: data.treatment.products.map((product) => ({
                            name: product.name,
                            dosage: product.dosage,
                            unit: product.unit,
                        })),
                    },
                },
            },
        },
        include: {
            stages: true,
            call: true,
            operation: true,
            treatment: { include: { products: true } },
            material: true,
            techReport: { include: { flight: true } },
        },
    })
    console.log(report)

    return report
}

const update = async (data: { reportId: number; areaTrabalhada: number; materials: NewMaterial[] }) => {
    console.log(data)

    const report = await prisma.report.update({
        where: { id: data.reportId },
        data: {
            areaTrabalhada: data.areaTrabalhada,
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
        include: {
            operation: true,
            treatment: { include: { products: true } },
            material: true,
            techReport: { include: { flight: true } },
        },
    })

    console.log(report)
    return report
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
        },
    })

    console.log(report)
    return report
}
const close = async (reportId: number) => {
    const report = await prisma.report.update({
        where: { id: reportId },
        data: { close: new Date().getTime().toString() },
        include: {
            operation: true,
            treatment: { include: { products: true } },
            material: true,
            techReport: { include: { flight: true } },
        },
    })

    console.log(report)
    return report
}

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
    return await prisma.report.findMany({
        include: {
            call: { include: { kit: true, talhao: { include: { tillage: true } } } },
            operation: true,
            treatment: true,
            material: true,
            techReport: { include: { flight: true } },
        },
    })
}

const createNewReportAtMidnight = async (data: NewReport) => {
    console.log(data)
    // Get the current date
    const currentDate = new Date()

    // Calculate the date for the previous day
    const previousDay = new Date(currentDate)
    previousDay.setDate(previousDay.getDate() - 1)

    try {
        // Check if a report for the previous day already exists
        const existingReport = await prisma.report.findFirst({
            where: {
                AND: [{ callId: data.callId }, { date: previousDay.toISOString().slice(0, 10) }],
            },
        })

        // If no report exists for the previous day, create a new report
        if (!existingReport) {
            // Create a new report
            const lateReport = await create(data)
            console.log("New report created at midnight for the previous day:", lateReport)
            return lateReport
        } else {
            console.log("Report for the previous day already exists. No action needed.")
        }
    } catch (error) {
        console.error(`Error creating report for the previous day: ${error}`)
    }
}

export default {
    create,
    update,
    find,
    list,
    createNewReportAtMidnight,
  approve,
  close
}
