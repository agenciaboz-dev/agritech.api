import { Socket } from "socket.io"
import { User } from "@prisma/client"
import { getIoInstance, handleSocket } from "./socket"
import databaseHandler from "../databaseHandler"
import { ClientBag } from "../definitions/client"
import { LoginForm } from "../definitions/newUser"

const prisma = databaseHandler

const logout = async (socket: Socket, clients: ClientBag, user: User) => {
    const io = getIoInstance()
    io.emit("user:disconnect", user)
    clients.remove(clients?.get(socket))
}

const handleLogin = async (socket: Socket, data: LoginForm) => {
    const user = await databaseHandler.user.login(data)

    if (user) {
        // Se o login for bem-sucedido, emitimos um evento "user:login:success" com os detalhes do usuário.
        socket.emit("user:login:success", user)
    } else {
        // Se o login falhar, emitimos um evento "user:login:failed" com uma mensagem de erro.
        socket.emit("user:login:failed", { error: "Credenciais inválidas." })
    }
}

const newUser = async (socket: Socket, newUser: any) => {
    console.log(newUser)
    const user = await prisma.user.new(newUser)

    if (user) {
        socket.emit("user:signup:success", user)
        socket.broadcast.emit("user:new", user)
    } else {
        socket.emit("user:signup:failed")
    }
}
export default { logout, newUser, handleLogin }


