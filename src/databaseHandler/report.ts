// import { CloseCall, OpenCall } from "../definitions/call";
import { Report, PrismaClient } from "@prisma/client"
import { NewReport } from "../definitions/report"
import { connect } from "http2"
import flight from "./flight"

const prisma = new PrismaClient()

const create = async (data: NewReport) => {
    console.log("Iniciando a criação do relatório...")
    const report = await prisma.report.create({
        data: {
            callId: data.callId,
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
            operation: true,
            treatment: { include: { products: true } },
            material: true,
            techReport: { include: { flight: true } },
        },
    })
    console.log(report)

    return report
}

const update = async (data: Report) => {
    console.log("Initiating Report Update...")
    const report = await prisma.report.update({
        where: { id: data.id },
        data: {
            callId: data.callId,
            areaTrabalhada: data.areaTrabalhada,
        },
    })
    console.log("Report updated:", report)
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
