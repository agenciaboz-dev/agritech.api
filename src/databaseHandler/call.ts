import { Call, PrismaClient } from "@prisma/client"
import { OpenCall, AdminCall, ApproveCall } from "../types/call"

const prisma = new PrismaClient()

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
        console.log({ Ola_aqui: data })

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
                stage: "STAGE1",
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
            include: {
                operation: true,
                treatment: { include: { products: true } },
                material: true,
                techReport: { include: { flight: true } },
            },
        })

        // Create the stage
        const stage = await prisma.stage.create({
            data: {
                name: "STAGE1",
                reportId: report.id,
            },
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

        console.log("Call, Producer, Stage, and Updated Call created/updated:", {
            call,
            tillage,
            stage,
            report,
            updatedCall,
        })
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
                    stage: "STAGE1",
                },
            })

            if (existingReport) {
                throw new Error("A STAGE1 status stage already exists for this call's initial report")
            }

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

            const report = await prisma.report.create({
                data: {
                    callId: call.id,
                    stage: "STAGE1",
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
                include: {
                    operation: true,
                    treatment: { include: { products: true } },
                    material: true,
                    techReport: { include: { flight: true } },
                },
            })

            const stage = await prisma.stage.create({
                data: {
                    name: "STAGE1",
                    reportId: report.id,
                },
            })
            console.log(stage)

            return { call: updatedCall, stage, report }
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
    return { call }
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

// // Process each call and update the totalPrice
// const updatedCalls = await Promise.all(
//   calls.map(async (call) => {
//     const findTillage = await prisma.tillage.findUnique({
//       where: { id: call.talhao?.tillageId || 0 },
//     });
//     const tillageHectarePrice = findTillage?.hectarePrice || 0;

//     // Calculate the total areaTrabalhada from all reports
//     const totalAreaTrabalhada = call.reports.reduce((total, report) => {
//       return total + (report.areaTrabalhada || 0);
//     }, 0);

//     // Calculate the desired value for each call
//     const calculatedValue = tillageHectarePrice * totalAreaTrabalhada;

//     // Update the totalPrice in the database
//     const updatedCall = await prisma.call.update({
//       where: { id: call.id },
//       data: {
//         totalPrice: calculatedValue,
//       },
//       include: {
//         kit: { include: { employees: true, calls: true, objects: true } },
//         producer: { include: { user: true } },
//         user: true,
//         talhao: true,
//         reports: {
//           include: {
//             operation: true,
//           },
//         },
//       },
//     });

//     return updatedCall;
//   })
// );

//   return call;
// };

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
                    call: {
                        include: { talhao: { include: { tillage: true } }, kit: true },
                    },

                    stages: true,
                    operation: true,
                    treatment: { include: { products: true } },
                    material: true,
                    techReport: { include: { flight: true } },
                },
            },
        },
    })
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
    cancel,
    list,
    listPending,
    listApproved,
    // find,
}
