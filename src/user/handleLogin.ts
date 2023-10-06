import { Socket } from "socket.io"
import { getIoInstance } from "../io/socket"
import databaseHandler from "../databaseHandler"

export const handleLogin = (socket: Socket) => {
    const io = getIoInstance()

    socket.on("user:login", async (data: { login: string; password: string }) => {
        const user = await databaseHandler.user.login(data)

        if (user) {
            // Se o login for bem-sucedido, emitimos um evento "user:login:success" com os detalhes do usuário.
            socket.emit("user:login:success", user)
        } else {
            // Se o login falhar, emitimos um evento "user:login:failed" com uma mensagem de erro.
            socket.emit("user:login:failed", { message: "Credenciais inválidas." })
        }
    })
}
