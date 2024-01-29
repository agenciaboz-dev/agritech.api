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
            include: { tillage: true, user: true },
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

    const producer = await prisma.producer.update({
        where: { id: data.producerId },
        data: {
            hectarePrice: data.hectarePrice,
        },
    })

    console.log({ call, producer })

    console.log("Chamado aberto:", call, producer)
    return { call, producer }
}

const update = async (data: Call) => {
    console.log("Iniciando a atualização do chamado...")
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            open: data.open,
            init: data.init,
            finish: data.finish,
            approved: data.approved,
            comments: data.comments,
            status: data.status,
            stage: data.stage,
            tillageId: data.tillageId,
            producerId: data.producerId,
            userId: data.userId,
            kitId: data.kitId,
            totalPrice: data.totalPrice, // Remove the extra semicolon here
        },
    })
    console.log({ call })

    console.log("Chamado atualizado:", call)
    return call
}

const approve = async (data: OpenCall) => {
    try {
        const call = await prisma.call.findUnique({ where: { id: data.id } })

        if (call) {
            const call = await prisma.call.update({
                where: { id: data.id },
                data: {
                    approved: data.kitId ? true : false,
                    status: "INPROGRESS",
                    stage: "STAGE1",
                    kitId: data.kitId,
                    init: new Date().toISOString(),
                },
            })

            const producer = await prisma.producer.update({
                where: { id: data.producerId },
                data: {
                    hectarePrice: data.hectarePrice,
                },
            })

            const stage = await prisma.stage.create({
                data: {
                    name: "STAGE1",
                    callId: call.id,
                },
            })
            console.log("Stage 1 Criado:", stage)

            return { call, stage, producer }
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

    return { call }
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
            kit: { include: { employees: true, calls: true, objects: true } },
            producer: { include: { user: true } },
            user: true,
            stages: true,
            tillage: true,
            report: true,
        },
    })
}
const listPending = async () => {
    return await prisma.call.findMany({
        where: { approved: false },
        include: {
            kit: true,
            producer: { include: { user: true } },
            user: true,
            tillage: true,
        },
    })
}
const listApproved = async () => {
    return await prisma.call.findMany({
        where: { approved: true },
        include: {
            kit: {
                include: {
                    employees: { include: { user: true } },
                    calls: true,
                    objects: true,
                },
            },
            producer: { include: { user: true } },
            user: true,
            stages: true,
            report: {
                include: {
                    operation: true,
                    treatment: { include: { products: true } },
                    material: true,
                    techReport: { include: { flight: true } },
                },
            },
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
    update,
    approve,
    close,
    cancel,
    list,
    listPending,
    listApproved,
    find,
}
