import { Call, User } from "@prisma/client"
import { OpenCall, AdminCall, ApproveCall } from "../types/call"
import report_db, { report_include } from "./report"
import { checkMidnight } from "../io/report"
import { prisma } from "./prisma"

const inclusions = {
    call: {
        tillage: {
            include: {
                address: true,
                location: true,
                gallery: true,
                talhao: { include: { name: true, area: true, location: true } },
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

const adminCreate = async (data: AdminCall) => {
    try {
        // Create the call
        const call = await prisma.call.create({
            data: {
                open: new Date().getTime().toString(),
                comments: data.comments,
                talhaoId: data.talhaoId,
                producerId: data.producerId,
                userId: data.userId,
                kitId: data.kitId,
                forecast: data.forecast,
                approved: data.approved,
            },
        })

        // Update the producer
        const findTalhao = await prisma.talhao.findUnique({
            where: { id: data.talhaoId },
        })
        const findTillage = await prisma.tillage.findUnique({
            where: { id: findTalhao?.tillageId },
        })
        console.log({ talhao: findTalhao })
        const tillage = await prisma.tillage.update({
            where: { id: findTalhao?.tillageId },
            data: {
                hectarePrice: data.hectarePrice || findTillage?.hectarePrice,
            },
        })

        const report = await prisma.report.create({
            data: {
                callId: call.id,
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

        // Update the call
        const updatedCall = await prisma.call.update({
            where: { id: call.id },
            data: {
                approved: data.kitId != undefined ? true : false,
                status: "INPROGRESS",
                kitId: data.kitId,
                init: new Date().getTime().toString(),
            },
            include: {
                talhao: {
                    include: {
                        calls: true,
                        gallery: true,
                        location: true,
                        tillage: true,
                    },
                },
                kit: { include: { employees: { include: { user: true } }, calendar: true, objects: true } },
                reports: {
                    include: {
                        call: true,
                        material: true,
                        operation: true,
                        stages: true,
                        techReport: true,
                        treatment: true,
                    },
                },
                producer: { include: { tillage: true, user: true } },
            },
        })

        try {
            await checkMidnight(report)
        } catch (error) {
            console.log(error)
        }
        return {
            ...updatedCall,
            talhao: updatedCall.talhao
                ? {
                      ...updatedCall.talhao,
                      cover: "",
                      tillage: { ...updatedCall.talhao.tillage, cover: "" },
                  }
                : null,
            producer: updatedCall?.producer && {
                ...updatedCall?.producer,
                tillage: updatedCall?.producer?.tillage.map((item) => ({
                    ...item,
                    cover: "",
                })),
                user: updatedCall.producer.user,
            },
        }
    } catch (error) {
        console.error("Error in creating and updating the call:", error)
        throw error
    }
}

const create = async (data: OpenCall) => {
    console.log(data)
    const call = await prisma.call.create({
        data: {
            open: new Date().getTime().toString(),

            comments: data.comments,
            talhaoId: data.talhaoId,
            producerId: data.producerId,
            userId: data.userId,
            forecast: data.forecast,
            kitId: data.kitId,
        },
        include: {
            producer: { include: { user: true } },
            user: { include: { employee: true, producer: true } },
        },
    })

    console.log({ call })
    return { call }
}

const update = async (data: Call) => {
    console.log(data)
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            open: data.open,
            init: data.init,
            finish: data.finish,
            approved: data.approved,
            comments: data.comments,
            status: data.status,
            talhaoId: data.talhaoId,
            producerId: data.producerId,
            userId: data.userId,
            kitId: data.kitId,
            totalPrice: data.totalPrice,
        },
    })
    console.log({ call })
    return call
}

const approve = async (data: ApproveCall) => {
    try {
        const call = await prisma.call.findUnique({ where: { id: data.id } })

        if (call) {
            const existingReport = await prisma.report.findFirst({
                where: {
                    callId: data.id,
                    stage: 1,
                },
            })

            const updatedCall = await prisma.call.update({
                where: { id: data.id },
                data: {
                    approved: data.kitId ? true : false,
                    status: "INPROGRESS",
                    kitId: data.kitId,
                    init: new Date().getTime().toString(),
                },
                include: {
                    producer: { include: { user: true } },
                    kit: { include: { employees: { include: { user: true } } } },
                },
            })

            const report = await report_db.create(call.id)
            try {
                await checkMidnight(report)
            } catch (error) {
                console.log(error)
            }

            return { ...updatedCall, report }
        } else {
            throw new Error("Call not found or kit already assigned")
        }
    } catch (error) {
        console.error("Error in approving call:", error)
        throw error
    }
}

const close = async (data: Call) => {
    console.log(data)
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            finish: new Date().getTime().toString(),
            status: "CLOSED",
        },
        include: {
            producer: { include: { user: true } },
            kit: { include: { employees: { include: { user: true } } } },
        },
    })
    console.log({ call })
    return { call }
}

const cancel = async (data: Call) => {
    console.log(data)
    const call = await prisma.call.update({
        where: { id: data.id },
        data: {
            status: "CANCELED",
            kit: undefined,
            kitId: undefined,
        },
        include: {
            producer: { include: { user: true } },
            kit: { include: { employees: { include: { user: true } } } },
        },
    })
    console.log({ call })

    // const report = await prisma.report.create({
    //   data: {
    //     callId: call.id,
    //   },
    // });
    // console.log("Report criado para o chamado:", report);
    return call
}
const find = async (id: number) => {
    const call = await prisma.call.findUnique({
        where: { id },
        include: {
            kit: { include: { employees: true, calls: true, objects: true } },
            producer: { include: { user: true } },
            user: true,
            talhao: { include: { tillage: { include: { address: true } } } },
            reports: {
                include: {
                    stages: true,
                    call: true,
                    material: true,
                    operation: true,
                    treatment: true,
                    techReport: true,
                },
            },
        },
    })
    return {
        ...call,
        talhao: { ...call?.talhao, cover: "", tillage: { ...call?.talhao.tillage, cover: "" } },
    }
}
const list = async () => {
    const calls = await prisma.call.findMany({
        include: {
            kit: { include: { employees: true, calls: true, objects: true } },
            producer: { include: { user: true } },
            user: true,
            talhao: { include: { tillage: { include: { address: true } } } },
            reports: {
                include: {
                    stages: true,
                    call: true,
                    material: true,
                    operation: true,
                    treatment: true,
                    techReport: true,
                },
            },
        },
    })

    return calls.map((item) => ({
        ...item,
        talhao: { ...item.talhao, cover: "", tillage: { ...item.talhao.tillage, cover: "" } },
    }))
}

const listPending = async () => {
    return await prisma.call.findMany({
        where: { approved: false },
        include: {
            kit: true,
            producer: { include: { user: true, call: true } },
            user: true,
            talhao: {
                include: {
                    location: true,
                    gallery: true,
                    tillage: {
                        include: { address: true, gallery: true, location: true },
                    },
                },
            },
        },
    })
}
const listApproved = async (user?: User) => {
    const calls = await prisma.call.findMany({
        where: { approved: true },
        include: {
            kit: {
                include: {
                    employees: { include: { user: true } },
                    calls: true,
                    objects: true,
                },
            },
            talhao: {
                include: {
                    location: true,
                    gallery: true,
                    tillage: {
                        include: { address: true, gallery: true, location: true },
                    },
                },
            },
            producer: { include: { user: true } },
            user: true,
            reports: {
                include: {
                    // call: {
                    //     include: { talhao: { include: { tillage: true } }, kit: true },
                    // },

                    stages: true,
                    operation: true,
                    treatment: { include: { products: true } },
                    material: true,
                    techReport: { include: { flight: true } },
                },
            },
        },
    })

    return calls.map((call) => ({
        ...call,
        talhao: {
            ...call.talhao,
            cover: "",
            tillage: { ...call.talhao.tillage, cover: "" },
        },
        reports: call.reports
            ? call.reports.map((report) => ({
                  ...report,
                  //   call: call.reports.map((item) => ({
                  //       ...item,
                  //       talhao: { ...item.call.talhao, cover: "", tillage: { ...item.call.talhao.tillage, cover: "" } },
                  //   })),
              }))
            : null,
    }))
}

// const find = async (id: number) => {
//   const report = await prisma.report.findUnique({ where: { id } });
//   console.log({ report });
//   return report;
// };

export default {
    adminCreate,
    create,
    update,
    approve,
    close,
    find,
    cancel,
    list,
    listPending,
    listApproved,
    // find,
}
