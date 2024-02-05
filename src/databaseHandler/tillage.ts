import { OpenCall } from "../definitions/call"
import { NewTillage } from "../definitions/tillage"
import { PrismaClient } from "@prisma/client"
import talhao from "./talhao"

const prisma = new PrismaClient()

const inclusions = {
    tillage: { address: true, location: true, gallery: true, call: true, talhao: { include: { calls: true } } },
    address: { use: true, tillage: true },
    location: { tillage: true },
    gallery: {},
    call: { stages: true, report: true },
}
const create = async (data: NewTillage) => {
    console.log(data)
    console.log("Iniciando a criação da Lavoura...")
    const tillage = await prisma.tillage.create({
        data: {
            name: data.name,
            area: Number(data.area),
            owner: data.owner,
            ceo: data.ceo,
            manager: data.manager,
            agronomist: data.agronomist,
            technician: data.technician,
            pilot: data.pilot,
            others: data.others,
            comments: data.comments,
            producerId: data.producerId,
        },
    })
    console.log({ address: data.address })

    const address = await prisma.address.create({
        data: {
            street: data.address.street,
            number: data.address.number,
            city: data.address.city,
            cep: data.address.cep,
            adjunct: data.address.adjunct || "",
            district: data.address.district,
            uf: data.address.uf,
            tillageId: tillage.id,
        },
    })
    // Criação das coordenadas
    if (data.location) {
        const locations = await Promise.all(
            data.location.map(async (location) => {
                return await prisma.coordinate.create({
                    data: {
                        x: location.x,
                        y: location.y,
                        tillageId: tillage.id,
                    },
                })
            })
        )
    }

    console.log("Lavoura criada:", tillage)

    return { tillage }
}

const update = async (data: NewTillage & { id: number }) => {
    const tillage = await prisma.tillage.update({
        where: { id: data.id },
        data: {
            name: data.name,
            area: data.area,
            owner: data.owner,
            ceo: data.ceo,
            manager: data.manager,
            agronomist: data.agronomist,
            technician: data.technician,
            pilot: data.pilot,
            others: data.others,
            comments: data.comments,
            producerId: data.producerId,
            address: {
                update: {
                    street: data.address.street,
                    number: data.address.number,
                    city: data.address.city,
                    cep: data.address.cep,
                    adjunct: data.address.adjunct || "",
                    district: data.address.district,
                    uf: data.address.uf,
                },
            },
        },
        include: { address: true, producer: true },
    })
    console.log("tillage update: ", data)

    return tillage
}

const list = async () => {
    return await prisma.tillage.findMany({
        include: {
            address: true,
            location: true,
            gallery: true,
            producer: true,
            talhao: {
                include: {
                    gallery: true,
                    location: true,
                    tillage: true,
                    calls: { include: { reports: true, stages: true, kit: true, producer: true } },
                },
            },
        },
    })
}

export default {
    create,
    update,
    list,
}
