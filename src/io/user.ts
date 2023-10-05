import { Socket } from "socket.io"
import { User } from "@prisma/client"
import { getIoInstance } from "./socket"
import databaseHandler from "../databaseHandler"
import { ClientBag } from "../definitions/client"

const prisma = databaseHandler

const logout = async (socket: Socket, clients: ClientBag, user: User) => {
    const io = getIoInstance()
    io.emit("user:disconnect", user)
    clients.remove(clients?.get(socket))
}

const newUser = async (socket: Socket, newUser: any) => {
    let user = await prisma.user.new(newUser)

    if (user) {
        socket.emit("user:new:success", user)
        socket.broadcast.emit("user:new", user)
    } else {
        socket.emit("user:new:failed")
    }
}

export default { logout, newUser }
