import { NewUser } from "../types/user"
import { PrismaClient } from "@prisma/client"
import normalize from "../normalize"
import { saveImage } from "../tools/saveImage"
import { UserFull, user_include } from "../prisma/types/user"

const prisma = new PrismaClient()

const inclusions = {
    user: {
        producer: {
            include: {
                tillage: {
                    include: {
                        address: true,
                        location: true,
                        gallery: true,
                        talhao: { include: { calls: true } },
                    },
                },
                user: true,
            },
        },
        employee: {
            include: {
                bank: true,
                professional: true,
                calendars: true,
                producers: true,
                kits: { include: { calls: true } },
            },
        },
        address: true,
    },

    employee: {
        bank: true,
        professional: true,
        calendars: true,
        producers: true,
    },
    producer: {
        tillage: { include: { address: true, location: true, gallery: true } },
    },
    tillage: {
        address: true,
        location: true,
        gallery: true,
        talhao: {
            include: { name: true, area: true, location: true, calls: true },
        },
    },
    address: { use: true, tillage: true },
    bank: { employee: true },
    professional: { employee: true },
    coordinate: { tillage: true },
    gallery: {},
}

const approve = async (id: number) => {
    return await prisma.user.update({
        where: { id },
        data: {
            approved: true,
            rejected: null,
        },
        include: {
            producer: {
                include: {
                    tillage: {
                        include: {
                            address: true,
                            location: true,
                            gallery: true,
                            talhao: { include: { calls: true } },
                        },
                    },
                    user: true,
                },
            },
            employee: {
                include: {
                    bank: true,
                    professional: true,
                    calendars: true,
                    producers: true,
                    kits: { include: { calls: { include: { talhao: true } } } },
                },
            },
            address: true,
        },
    })
}

const reject = async (id: number) => {
    return await prisma.user.update({
        where: { id },
        data: {
            approved: false,
            rejected: "Rejection Reason", // Set rejection reason
        },
    })
}

const exists = async (data: NewUser) => {
    return await prisma.user.findUnique({
        where: {
            username: data.username,
            email: data.email,
            cpf: data.cpf,
        },
    })
}

const login = async (data: { login: string; password: string }) => {
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: data.login }, { username: data.login }, { cpf: data.login }],
            AND: { password: data.password },
        },
        include: inclusions.user,
    })

    return {
        ...user,

        producer: user?.producer
            ? {
                  ...user?.producer,
                  tillage: user?.producer?.tillage.map((tillage) => ({
                      ...tillage,
                      cover: "",
                      talhao: tillage.talhao.map((talhao) => ({ ...talhao, cover: "" })),
                  })),
              }
            : null,
    }
}

const pendingList = async () => {
    const users = await prisma.user.findMany({
        where: { approved: false },
        include: inclusions.user,
    })
    return users.map((user) => ({
        ...user,
        producer: {
            ...user.producer,
            tillage: user.producer?.tillage.map((tillage) => ({
                ...tillage,
                cover: "",
                talhao: tillage.talhao.map((talhao) => ({ ...talhao, cover: "" })),
            })),
        },
    }))
}

const approvedList = async () => {
    const users = await prisma.user.findMany({
        where: { approved: true },
        include: inclusions.user,
    })
    return users.map((user) => ({
        ...user,
        producer: user.producer
            ? {
                  ...user.producer,
                  tillage: user.producer
                      ? user.producer?.tillage.map((tillage) => ({
                            ...tillage,
                            cover: "",
                            talhao: tillage.talhao.map((talhao) => ({ ...talhao, cover: "" })),
                        }))
                      : null,
              }
            : null,
    }))
}
const findById = async (id: number) => {
    return await prisma.user.findFirst({
        where: { id },

        include: inclusions.user,
    })
}

const findByUsername = async (username: string) =>
    await prisma.user.findFirst({
        where: { username },
        include: inclusions.user,
    })

const newUser = async (data: NewUser) => {
    console.log(data)
    try {
        let image: string | undefined

        if (data.image?.file) {
            image = saveImage(`user/profile`, data.image.file, data.image.name)
        }

        console.log(data)
        const user = await prisma.user.create({
            data: {
                birth: data.birth,
                cpf: data.cpf.replace(/\D/g, ""),
                email: normalize(data.email),
                name: data.name,
                password: data.password,
                phone: data.phone?.replace(/\D/g, ""),
                username: normalize(data.username),
                isAdmin: data.isAdmin || false,
                approved: data.approved, // <<<<< gambiarrei
                rejected: null,
                office: data.office,

                image: image,
            },
            include: inclusions.user,
        })

        const address = await prisma.address.create({
            data: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                cep: data.address.cep,
                adjunct: data.address.adjunct || "",
                district: data.address.district,
                uf: data.address.uf,
                userId: user.id,
            },
        })
        console.log(user, address)

        if (data.employee) {
            const employee = await prisma.employee.create({
                data: {
                    gender: data.employee.gender,
                    relationship: data.employee.relationship,
                    nationality: data.employee.nationality,
                    residence: data.employee.residence,
                    rg: data.employee.rg,
                    voter_card: data.employee.voter_card,
                    work_card: data.employee.work_card,
                    military: data.employee.military,
                    userid: user.id,
                },
            })
            const bank = await prisma.bank.create({
                data: {
                    account: "",
                    agency: "",
                    name: "",
                    type: "",
                    employeeId: employee.id,
                },
                include: { employee: true },
            })
            const professional = await prisma.professional.create({
                data: {
                    admission: "",
                    salary: 0,
                    department: "",
                    office: data.office,
                    employeeId: employee.id,
                },
                include: { employee: true },
            })

            console.log(employee)
        } else if (data.producer) {
            const producer = await prisma.producer.create({
                data: {
                    cnpj: data.producer.cnpj,
                    inscricaoEstadual: data.producer.inscricaoEstadual,
                    contract: data.producer.contract,
                    employeeId: data.producer.employeeId,
                    tillage: data.producer.tillage,
                    userid: user.id,
                },
            })
            console.log(producer)
        }
        return await prisma.user.findFirst({
            where: { id: user.id },
            include: inclusions.user,
        })
    } catch (error) {
        console.log(error)
    }
}
const newEmployee = async (data: NewUser) => {
    console.log(data)
    try {
        const birth = data.birth ? new Date(data.birth.split("/").reverse().join("/")) : undefined

        let image: string | undefined

        if (data.image?.file) {
            image = saveImage(`user/profile`, data.image.file, data.image.name)
        }

        console.log(data)
        const user = await prisma.user.create({
            data: {
                birth: data.birth,
                cpf: data.cpf.replace(/\D/g, ""),
                email: normalize(data.email),
                name: data.name,
                password: data.password,
                phone: data.phone?.replace(/\D/g, ""),
                username: normalize(data.username),
                isAdmin: data.isAdmin || false,
                isManager: data.isManager || false,
                approved: data.approved,
                rejected: null,
                office: data.office,

                image: image,
            },
            include: inclusions.user,
        })

        const address = await prisma.address.create({
            data: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                cep: data.address.cep,
                adjunct: data.address.adjunct || "",
                district: data.address.district,
                uf: data.address.uf,
                userId: user.id,
            },
        })
        console.log(user, address)

        if (data.employee) {
            const employee = await prisma.employee.create({
                data: {
                    gender: data.employee.gender,
                    relationship: data.employee.relationship,
                    nationality: data.employee.nationality,
                    residence: data.employee.residence,
                    rg: data.employee.rg,
                    voter_card: data.employee.voter_card,
                    work_card: data.employee.work_card,
                    military: data.employee.military,
                    userid: user.id,
                },
            })

            const bank = await prisma.bank.create({
                data: {
                    account: data.employee.bank.account,
                    agency: data.employee.bank.agency,
                    name: data.employee.bank.name,
                    type: data.employee.bank.type,
                    employeeId: employee.id,
                },
                include: { employee: true },
            })
            const professional = await prisma.professional.create({
                data: {
                    admission: data.employee.professional?.admission || "",
                    salary: data.employee.professional?.salary,
                    department: "",
                    office: data.office,
                    employeeId: employee.id,
                },
                include: { employee: true },
            })

            console.log(employee)
        }
        return await prisma.user.findFirst({
            where: { id: user.id },
            include: inclusions.user,
        })
    } catch (error) {
        console.log(error)
    }
}

const update = async (data: Partial<UserFull>, id: number) => {
    let image_url: string | undefined

    if (data.image && typeof data.image != "string") {
        image_url = saveImage(`user/profile`, data.image.file, data.image.name)
    }

    const user = await prisma.user.update({
        where: { id },
        data: {
            ...data,

            calls: {},
            chats: {},
            image: image_url || undefined,
            address: data.address ? { update: { ...data.address } } : {},
            producer: data.producer ? { update: { ...data.producer, tillage: {} } } : {},
            employee: data.employee
                ? {
                      update: {
                          ...data.employee,
                          bank: data.employee.bank ? { update: { ...data.employee.bank } } : {},
                          professional: data.employee.professional ? { update: { ...data.employee.professional } } : {},
                          calendars: {},
                          kits: {},
                          producers: {},
                      },
                  }
                : {},
        },
        include: user_include,
    })

    return user
}

const toggleAdmin = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            isAdmin: true,
        },
    })
    return await prisma.user.update({
        where: { id },
        data: {
            isAdmin: !user?.isAdmin,
        },
        include: inclusions.user,
    })
}

const toggleManager = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            isManager: true,
        },
    })
    return await prisma.user.update({
        where: { id },
        data: {
            isManager: !user?.isManager,
        },
        include: inclusions.user,
    })
}

export default {
    inclusions,
    approve,
    reject,
    exists,
    login,
    pendingList,
    approvedList,
    findById,
    findByUsername,
    newUser,
    newEmployee,
    update,
    toggleAdmin,
    toggleManager,
}
