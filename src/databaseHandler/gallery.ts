import { NewGallery } from "../definitions/gallery"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const create = async (data: NewGallery) => {
    console.log("Iniciando a criação do galeria...")
    const gallery = await prisma.gallery.create({
        data: {
            image: data.image,
            tillageId: data.tillageId,
        },
    })
    console.log({ gallery })

    console.log("Coordenada criada e associada ao terreno:", gallery)
    return { gallery }
}

const update = async (data: NewGallery & { id: number }) => {
    const gallery = await prisma.gallery.update({
        where: { tillageId: data.tillageId },
        data: {
            image: data.image,
        },
    })
    console.log("Coordinate Update: ", data)

    return { gallery }
}

const list = async () => {
    return await prisma.gallery.findMany({})
}

export default {
    create,
    update,
    list,
}
