import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/gallery"
import { NewGallery } from "../types/gallery"
import { Gallery } from "@prisma/client"

const newGallery = async (socket: Socket, data: any) => {
    console.log(data)
    try {
        const gallery = await databaseHandler.create(data)
        socket.emit("gallery:creation:success", gallery)
    } catch (error) {
        console.log(error)
        socket.emit("gallery:creation:failed", { error: error })
    }
}

const updateGallery = async (socket: Socket, data: NewGallery) => {
    console.log(data)
    try {
        const gallery = await databaseHandler.update(data)

        socket.emit("gallery:update:success", gallery)
    } catch (error) {
        console.log(error)
        socket.emit("gallery:update:failed", { error: error })
    }
}

const listGallery = async (socket: Socket) => {
    console.log("Gallery List:")
    try {
        const gallery = await databaseHandler.list()

        socket.emit("gallery:list:success", gallery)
    } catch (error) {
        console.log(error)
        socket.emit("gallery:list:failed", { error: error })
    }
}

const removeGallery = async (socket: Socket, id: number) => {
    console.log(id)
    try {
        const gallery = await databaseHandler.remove(id)
        socket.emit("gallery:remove:success", gallery)
    } catch (error) {
        console.log(error)
        socket.emit("gallery:remove:error", { error: error })
    }
}

export default {
    newGallery,
    updateGallery,
    listGallery,
    removeGallery,
}
