// import { CloseCall, OpenCall } from "../definitions/call";
import { Stage, PrismaClient, Report, Call } from "@prisma/client";
import { NewStage } from "../types/stage";
import cronLib from "node-cron"; // Renamed import to avoid conflict
import { report_include } from "./report"

const prisma = new PrismaClient()

const create = async (data: NewStage, stage: number) => {
    console.log(data)

    const report = prisma.report.update({
        where: { id: data.reportId },
        data: {
            stage,
            stages: {
                create: {
                    name: data.name.toString(),
                    date: data.date,
                    start: data.start,
                    finish: data.finish,
                    duration: data.duration,
                    comments: data.comments,
                },
            },
        },
        include: report_include,
    })

    return report
}

export default {
    create,
}
