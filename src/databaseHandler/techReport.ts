import { Stage, PrismaClient, Report, Call } from "@prisma/client"
import { NewTechReport } from "../types/techReport"
import { report_include } from "./report"

const prisma = new PrismaClient()

const create = async (data: NewTechReport) => {
    console.log(data)
    const techReport = await prisma.techReport.create({
        data: {
            date: data.date,
            init: data.init,
            finish: data.finish,
            comments: data.comments,
            reportId: data.reportId,
        },
    })
    console.log({ Laudo: techReport })
    return techReport
}

const update = async (data: NewTechReport) => {
    const report = await prisma.report.update({
        where: { id: data.reportId },
        data: {
            techReport: {
                update: {
                    date: data.date,
                    init: data.init,
                    finish: data.finish,
                    comments: data.comments,
                    flight: {
                        deleteMany: { techReportId: data.id },
                        create: [
                            ...data.flight.map((flight) => ({
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
                        ],
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
    return await prisma.techReport.findUnique({ where: { id } })
}

const list = async () => {
    return await prisma.techReport.findMany({})
}

export default {
    create,
    update,
    find,
    list,
}
