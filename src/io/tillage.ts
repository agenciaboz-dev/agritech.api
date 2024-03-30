import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/tillage"
import { Notification } from "../class/Notification"
import user from "../databaseHandler/user"
import { error } from "console"

const newTillage = async (socket: Socket, data: any, isAdmin: boolean) => {
    console.log(data)

    try {
        const tillage = await databaseHandler.create(data)

        socket.emit("tillage:creation:success", tillage)
        socket.broadcast.emit("tillage:new", tillage)
        const owner = await user.findById(tillage.tillage.producerId)
        if (isAdmin && owner) {
            new Notification({ action: "new", target_id: tillage.tillage.id, target_key: "tillage", users: [owner] })
        }
    } catch (error) {
        console.log(error)
        socket.emit("tillage:creation:failed", { error: error })
    }
}

const tillage_cover = async (socket: Socket, tillageId: number) => {
    try {
        const tillage = await databaseHandler.coverTillage(tillageId)
        
        socket.emit("tillage:cover:success", { tillageId: tillage?.id, cover: tillage?.cover })
        socket.broadcast.emit("tillage:cover", { tillageId: tillage?.id, cover: tillage?.cover })
        

    } catch {
        console.log(error)
        socket.emit("tillage:coover:failed", error)
    }
}
const updateTillage = async (socket: Socket, data: any) => {
    console.log(data)

    try {
        const tillage = await databaseHandler.update(data)
        socket.emit("tillage:update:success", tillage)
        socket.broadcast.emit("tillage:update", tillage)

    } catch (error) {
        console.log(error)
        socket.emit("tillage:update:failed", { error: error })
    }
}

const listTillage = async (socket: Socket) => {
    const tillage = await databaseHandler.list()
    socket.emit("tillage:list:success", tillage)
}

export default {
    newTillage,
    updateTillage,
    listTillage,
    tillage_cover,
}
