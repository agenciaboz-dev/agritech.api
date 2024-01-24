// import { CloseCall, OpenCall } from "../definitions/call";
import { Call, PrismaClient, Report } from "@prisma/client"
import createReport from "./report"
import { OpenCall } from "../definitions/call"

const prisma = new PrismaClient()

const inclusions = {
    call: {
        stages: true,
        tillage: {
            include: {
                address: true,
                location: true,
                gallery: true,
                producer: true,
            },
        },
        report: true,
        kit: true,
        producer: {
            include: { tillage: true },
        },
        user: true,
    },
}

const create = async (data: OpenCall) => {
    console.log("Iniciando a criação do chamado...")
    const call = await prisma.call.create({
        data: {
            open: new Date().toISOString(),
            approved: data.approved,
            comments: data.comments,
            tillageId: data.tillageId,
            producerId: data.producerId,
            userId: data.userId,
            kitId: data.kitId || undefined,
        },
    })
    console.log({ call })

    console.log("Chamado aberto:", call)
    return call
}

const approve = async (data: Call) => {
    try {
        const call = await prisma.call.findUnique({ where: { id: data.id } })

        if (call) {
            const newStage = await prisma.stage.create({
                data: {
                    name: "STAGE1",
                    callId: call.id,
                },
            })
            const updatedCall = await prisma.call.update({
                where: { id: data.id },
                data: {
                    init: new Date().toISOString(),
                    approved: data.kitId ? true : false,
                    status: "INPROGRESS",
                    stage: "STAGE1",
                    kitId: data.kitId,
                },
            })

            console.log("Stage 1 Criado:", newStage)

            return await prisma.call.findFirst({ where: { id: call.id }, include: inclusions.call })
        } else {
            throw new Error("Call not found or kit already assigned")
        }
    } catch (error) {
        console.error("Error in approving call:", error)
        throw error
    }
}

const close = async (data: Call) => {
    console.log("Iniciando a fechamento do chamado...")
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            finish: new Date().toISOString(),
            status: "CLOSED",
        },
    })
    console.log({ call })

    console.log("Chamado fechado:", call)

    const report = await prisma.report.create({
        data: {
            callId: call.id,
        },
    })
    console.log("Report criado para o chamado:", report)
    return { call, report }
}

const cancel = async (data: Call) => {
    console.log("Iniciando o cancelamento do chamado...")
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            status: "CANCELED",
        },
    })
    console.log({ call })

    console.log("Chamado Cancelado:", call)

    const report = await prisma.report.create({
        data: {
            callId: call.id,
        },
    })
    console.log("Report criado para o chamado:", report)
    return { call, report }
}

const list = async () => {
    return await prisma.call.findMany({
        include: {
            kit: true,
            producer: true,
            user: true,
            stages: true,
            tillage: true,
        },
    })
}
const listPending = async () => {
    return await prisma.call.findMany({
        where: { approved: false },
        include: {
            kit: true,
            producer: true,
            user: true,
            tillage: true,
        },
    })
}
const listApproved = async () => {
    return await prisma.call.findMany({
        where: { approved: true },
        include: {
            kit: true,
            producer: true,
            user: true,
            stages: true,
            tillage: true,
        },
    })
}

const find = async (id: number) => {
    const report = await prisma.report.findUnique({ where: { id } })
    console.log({ report })
    return report
}

export default {
    create,
    approve,
    close,
    cancel,
    list,
    listPending,
    listApproved,
    find,
}
