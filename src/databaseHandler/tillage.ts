import { NewTillage } from "../types/tillage"
import { saveImage } from "../tools/saveImage"
import { prisma } from "./prisma"

const inclusions_tillage = {
    address: true,
    location: true,
    gallery: { include: { images: true } },
    producer: { include: { user: true } },
    talhao: {
        include: {
            gallery: true,
            location: true,
            tillage: { include: { address: true } },
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
                    kit: { include: { employees: { include: { user: true } } } },
                    producer: { include: { user: true } },
                },
            },
        },
    },
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
    const tillages = await prisma.tillage.findMany({
        include: inclusions_tillage,
    })
    return tillages.map((item) => ({
        ...item,
        cover: "",
        talhao: item.talhao.map((talhao) => ({ ...talhao, cover: "", tillage: { ...talhao.tillage, cover: "" } })),
    }))
}

const coverTillage = async (tillageId: number) => {
    const tillage = await prisma.tillage.findUnique({ where: { id: tillageId } })

    return tillage
}

export default {
    create,
    update,
    list,
    coverTillage,
}
