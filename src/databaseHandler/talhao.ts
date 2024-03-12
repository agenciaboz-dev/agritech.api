import { PrismaClient } from "@prisma/client"
import { NewTalhao } from "../types/talhao"
import { saveImage } from "../tools/saveImage"

const prisma = new PrismaClient()

const inclusions_talhao = {
    location: true,
    gallery: { include: { images: true } },
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
            talhao: true,
        },
    },
}

const create = async (data: NewTalhao) => {
    console.log(data)
    const talhao = await prisma.talhao.create({
        data: {
            cover: data.cover,
            name: data.name,
            area: Number(data.area),
            tillageId: data.tillageId,
        },
    })

    const uploaded = await Promise.all(
        data.gallery.map(async (item) => {
            try {
                const urls: string[] = []
                const files = item.images?.map((file) => {
                    return saveImage(`gallery/`, file.file, file.name)
                })

                console.log({ NOME_ARQUIVO: files })

                if (files) {
                    urls.push(...files)
                }

                const images = await Promise.all(
                    item.images?.map(async (file) => {
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
                        talhaoId: talhao.id,
                        tillageId: talhao.tillageId,
                        images: { create: images },
                    },
                })

                return gallery
            } catch (error) {
                console.log("Error creating gallery:", error)
                throw error
            }
        })
    )

    return prisma.talhao.findUnique({
        where: { id: talhao.id },
        include: { gallery: { include: { images: true } }, tillage: { include: { producer: { include: { user: true } } } } },
    })
}

const update = async (data: NewTalhao) => {
    const talhao = await prisma.talhao.update({
        where: { id: data.id },
        data: {
            name: data.name,
            area: data.area,
            cover: data.cover,
        },
    })
    console.log(data)

    return { talhao }
}

const find = async (id: number) => {
    return await prisma.talhao.findUnique({
        where: { id },
        include: inclusions_talhao,
    })
}

const list = async () => {
    const talhoes = await prisma.talhao.findMany({
        include: inclusions_talhao,
    })
    return talhoes.map((item) => ({
        ...item,
        cover: "",
        tillage: { ...item.tillage, cover: "" },
        calls: item.calls.map((call) => ({
            ...call,
            talhao: { ...call.talhao, cover: "" },
        })),
    }))
}

const coverTalhao = async (talhaoId: number) => {
    const talhao = await prisma.talhao.findUnique({ where: { id: talhaoId } })

    return talhao
}

export default {
    create,
    update,
    find,
    list,
    coverTalhao,
}
