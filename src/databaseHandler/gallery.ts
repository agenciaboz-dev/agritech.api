import { NewGallery } from "../types/gallery"
import { saveImage } from "../tools/saveImage"
import { prisma } from "./prisma"

const create = async (data: NewGallery) => {
    console.log(data)
    try {
        let urls: string[] = []
        const uploaded = data.images?.map((file) => {
            return saveImage(`gallery`, file.file, file.name)
        })

        if (uploaded) {
            urls = [...uploaded]
        }
        console.log({ url: urls })

        data.urls?.map((url) => urls.push(url))
        console.log({ urls })

        const gallery = await prisma.gallery.create({
            data: {
                images: {
                    create: uploaded?.map((item) => ({ url: item })),
                },
                tillageId: data.tillageId,
                talhaoId: data.talhaoId,
            },
        })

        console.log(gallery)
    } catch (error) {
        console.log(error)
    }
}

const update = async (data: NewGallery) => {
    console.log(data)
    try {
        let urls: string[] = []

        const uploaded = data.images?.map((image) => {
            saveImage(`gallery`, image.file, image.name)
            return `gallery/${image.name}`
        })

        if (uploaded) {
            urls = [...uploaded]
        }

        data.urls?.map((url) => urls.push(url))
        console.log({ urls })

        const gallery = await prisma.gallery.update({
            where: { id: data.id },
            data: {
                images: {
                    create: urls.map((url) => ({ url })),
                },
            },
        })

        console.log("Gallery updated:", gallery)
    } catch (error) {
        console.log(error)
    }
}

const list = async () => {
    return await prisma.gallery.findMany({ include: { images: true } })
}

const remove = async (id: number) => await prisma.gallery.delete({ where: { id } })

export default {
    create,
    update,
    list,
    remove,
}
