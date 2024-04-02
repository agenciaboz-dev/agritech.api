import { NewStage } from "../types/stage"
import { prisma } from "./prisma"
import { report_include } from "./report"

const create = async (data: NewStage, stage: number) => {
    console.log(data)

    const report = await prisma.report.update({
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

    return {
        ...report,
        call: {
            ...report.call,
            talhao: { ...report.call.talhao, cover: "", tillage: { ...report.call.talhao.tillage, cover: "" } },
        },
    }
}

export default {
    create,
}
