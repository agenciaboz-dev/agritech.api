import { NewUser } from "../definitions/user"
import { PrismaClient } from "@prisma/client"
import normalize from "../normalize"
import { saveImage } from "../tools/saveImage"

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
    return await prisma.user.findFirst({
        where: {
            OR: [{ email: data.login }, { username: data.login }, { cpf: data.login }],
            AND: { password: data.password },
        },
        include: inclusions.user,
    })
}

const pendingList = async () =>
    await prisma.user.findMany({
        where: { approved: false },
        include: inclusions.user,
    })

const approvedList = async () =>
    await prisma.user.findMany({
        where: { approved: true },
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
        const birth = data.birth ? new Date(data.birth.split("/").reverse().join("/")) : undefined

        let image: string | undefined

        if (data.image?.file) {
            image = saveImage(`user/profile`, data.image.file, data.image.name)
        }

        console.log(data)
        const user = await prisma.user.create({
            data: {
                birth: birth,
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
                birth: birth,
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

const update = async (data: NewUser & { id: number }) => {
    const birth = data.birth.split("/").reverse().join("/")
    try {
        let image: string | undefined

        if (data.image?.file) {
            image = saveImage(`user/profile`, data.image.file, data.image.name)
        }

        const address = await prisma.address.update({
            where: { userId: data.id },
            data: {
                street: data.address.street,
                number: data.address.number,
                city: data.address.city,
                cep: data.address.cep,
                adjunct: data.address.adjunct,
                district: data.address.district,
                uf: data.address.uf,
                userId: data.id,
            },
        })
        console.log(address)

        if (data.employee) {
            const employee = await prisma.employee.update({
                where: { userid: data.id },
                data: {
                    gender: data.employee.gender,
                    relationship: data.employee.relationship,
                    nationality: data.employee.nationality,
                    residence: data.employee.residence,
                    rg: data.employee.rg,
                    voter_card: data.employee.voter_card,
                    work_card: data.employee.work_card,
                    military: data.employee.military,
                    userid: data.id,
                },
            })

            console.log(employee)
        } else if (data.producer) {
            const producer = await prisma.producer.update({
                where: { userid: data.id },
                data: {
                    cnpj: data.producer.cnpj,
                    inscricaoEstadual: data.producer.inscricaoEstadual,
                    userid: data.id,
                },
            })
            console.log(producer)
        }

        const user = await prisma.user.update({
            where: { id: data.id },
            data: {
                birth: new Date(birth),
                cpf: data.cpf.replace(/\D/g, ""),
                email: normalize(data.email),
                name: data.name,
                password: data.password,
                phone: data.phone?.replace(/\D/g, ""),
                image: image,
                username: normalize(data.username),
                isAdmin: data.isAdmin || false,
                approved: data.approved,
                isManager: data.isManager || false,
            },
            include: inclusions.user,
        })

        return { user }
    } catch (error) {
        console.log(error)
    }
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
