import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/talhao"
import { Notification } from "../class/Notification"
import user from "../databaseHandler/user"
import { User } from "@prisma/client"

const newTalhao = async (socket: Socket, data: any, isAdmin: boolean) => {
    console.log("Talhao Recieved:", data)

    try {
        const talhao = await databaseHandler.create(data)
        socket.emit("talhao:create:success", talhao)
        // socket.broadcast.emit("talhao:create:success", talhao)

        if (isAdmin && talhao) {
            new Notification({
                action: "new",
                target_id: talhao.id,
                target_key: "talhao",
                users: [talhao.tillage.producer.user],
            })
        }
    } catch (error) {
        console.log(error)
        socket.emit("talhao:create:failed", { error: error })
    }
}

const updateTalhao = async (socket: Socket, data: any) => {
    console.log("Updated Talhao:", data)

    try {
        const talhao = await databaseHandler.update(data)
        socket.emit("talhao:update:success", talhao)
        // socket.broadcast.emit("talhao:update:success", talhao)
    } catch (error) {
        console.log(error)
        socket.emit("talhao:update:failed", { error: error })
    }
}

// const findTalhao = async (socket: Socket, id: number) => {
//     const talhao = await databaseHandler.find(id)
//     socket.emit("talhao:find:success", talhao)
// }

const listTalhao = async (socket: Socket, user: User) => {
    try {
        const talhao = await databaseHandler.list(user.isAdmin ? undefined : user.id)
        socket.emit("talhao:list:success", talhao)
        console.log(`talhoes: ${talhao.length}`)
    } catch (error) {}
    // socket.broadcast.emit("talhao:list", talhao)
}

const talhao_cover = async (socket: Socket, tillageId: number) => {
    try {
        const talhao = await databaseHandler.coverTalhao(tillageId)
        socket.emit("talhao:cover:success", talhao)
        // socket.broadcast.emit("talhao:cover:success", talhao)
    } catch (error) {
        console.log(error)
        socket.emit("talhao:cover:failed", error)
    }
}

export default {
    newTalhao,
    updateTalhao,
    listTalhao,
    // findTalhao,
    talhao_cover,
}
