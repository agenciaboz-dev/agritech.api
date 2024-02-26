import { OpenCall } from "../definitions/call"
import { NewTillage } from "../definitions/tillage"
import { PrismaClient } from "@prisma/client"
import talhao from "./talhao"
import { saveImage } from "../tools/saveImage"

const prisma = new PrismaClient()

const inclusions = {
    tillage: {
        address: true,
        location: true,
        gallery: true,
        call: true,
        talhao: { include: { calls: true } },
    },
    address: { use: true, tillage: true },
    location: { tillage: true },
    gallery: {},
    call: { stages: true, report: true },
}
const create = async (data: NewTillage) => {
    console.log(data)
    const tillage = await prisma.tillage.create({
        data: {
            cover: data.cover,
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
            hectarePrice: data.hectarePrice || 0,
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

    const uploaded =
        data.gallery &&
        (await Promise.all(
            data.gallery.map(async (item) => {
                try {
                    const urls: string[] = []
                    const files = item.images?.map((file: any) => {
                        return saveImage(`gallery/`, file.file, file.name)
                    })

                    console.log({ NOME_ARQUIVO: files })

                    if (files) {
                        urls.push(...files)
                    }

                    const images = await Promise.all(
                        item.images?.map(async (file: any) => {
                            try {
                                const imageUrl = await saveImage(`gallery/`, file.file, file.name)
                                return { url: imageUrl }
                            } catch (error) {
                                console.log("Error saving image:", error)
                                throw error
                            }
                        }) || []
                    )

                    const gallery = await prisma.gallery.create({
                        data: {
                            tillageId: tillage.id,
                            images: { create: images },
                        },
                    })

                    return gallery
                } catch (error) {
                    console.log("Error creating gallery:", error)
                    throw error
                }
            })
        ))

    console.log(tillage)

    return { tillage }
}

const update = async (data: NewTillage & { id: number }) => {
    const tillage = await prisma.tillage.update({
        where: { id: data.id },
        data: {
            cover: data.cover,
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
            hectarePrice: data.hectarePrice,
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
    console.log(tillage)

    return tillage
}

const list = async () => {
    return await prisma.tillage.findMany({
        include: {
            address: true,
            location: true,
            gallery: { include: { images: true } },
            producer: true,
            talhao: {
                include: {
                    gallery: true,
                    location: true,
                    tillage: true,
                    calls: {
                        include: {
                            reports: {
                                include: {
                                    stages: true,
                                    call: true,
                                    material: true,
                                    operation: true,
                                    treatment: { include: { products: true } },
                                    techReport: true,
                                },
                            },
                            kit: true,
                            producer: true,
                            talhao: true,
                        },
                    },
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
