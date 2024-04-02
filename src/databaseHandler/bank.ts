import { NewBank } from "../types/bank"
import { prisma } from "./prisma"

const create = async (data: NewBank) => {
    console.log("Input: ", data)
    const bank = await prisma.bank.create({
        data: {
            name: data.name,
            agency: data.agency,
            type: data.type,
            account: data.account,
            employeeId: data.employeeId,
        },
    })
    console.log({ bank })

    console.log("Output: ", bank)
    return { bank }
}

const update = async (data: NewBank) => {
    console.log("Input:", data)
    const bank = await prisma.bank.update({
        where: { employeeId: data.employeeId },
        data: {
            name: data.name,
            agency: data.agency,
            type: data.type,
            account: data.account,
        },
    })
    console.log("Output: ", bank)

    return { bank }
}

const find = async (id: number) => {
    return await prisma.bank.findUnique({ where: { id } })
}

const list = async () => {
    return await prisma.bank.findMany({})
}

export default {
    create,
    update,
    list,
    find,
}
