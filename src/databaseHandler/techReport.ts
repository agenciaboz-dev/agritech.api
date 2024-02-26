import { Stage, PrismaClient, Report, Call } from "@prisma/client"
import { NewTechReport } from "../definitions/techReport"

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
    console.log(data)
    console.log({ voos: data.flight })
    const flights = data.flight || []
    const techReport = await prisma.techReport.update({
        where: { id: data.id },
        data: {
            date: data.date,
            init: data.init,
            finish: data.finish,
            comments: data.comments,
            reportId: data.reportId,

            flight: {
                deleteMany: { techReportId: data.id },
                create: [
                    ...flights.map((flight) => ({
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
        include: {
            report: {
                include: { operation: true, treatment: true, techReport: true, material: true, stages: true, call: true },
            },
        },
    })
    console.log(techReport)

    return techReport
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
