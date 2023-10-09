import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"
import { Socket } from "socket.io"
import { User } from "@prisma/client"
import user from "./user"
import { Client, ClientBag } from "../definitions/client"
import client from "../definitions/client"
import { LoginForm } from "../definitions/newUser"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, { cors: { origin: "*" }, maxHttpBufferSize: 1e8 })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export let clientList: Client[] = []

const get = (socket: Socket) => clientList.find((client) => client.socket == socket)
const find = (id: number) => clientList.find((client) => client.user.id == id)
const getUser = (client: Client) => client.user
const list = () => clientList.map((client) => client.user)

const remove = (client: Client | undefined) => {
    if (!client) return
    clientList = clientList.filter((item) => item.socket != client.socket)
}

const add = (client: Client) => {
    const exists = find(client.user.id)
    if (exists) remove(client)

    clientList.push(client)
}

const update = (client: Client, user: User) =>
    (clientList = [...clientList.filter((item) => item.socket != client.socket), { ...client, user }])

export const handleSocket = (socket: Socket) => {
    const io = getIoInstance()

    const clients: ClientBag = {
        get,
        find,
        getUser,
        list,
        add,
        remove,
        update,
    }
    console.log(`new connection:${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
        const client = clients.get(socket)
        if (client) {
            user.logout(socket, clients, client.user)
        }
    })

    socket.on("user:logout", (data) => user.logout(socket, clients, data))

    socket.on("user:signup", (newUser: User) => user.newUser(socket, newUser))

    socket.on("user:login", (data: LoginForm) => user.handleLogin(socket, data))
}
