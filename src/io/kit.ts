import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/kit"

const newKit = async (socket: Socket, data: any) => {
    console.log("Kit Criado:", data)

    try {
        const kit = await databaseHandler.create(data)

        if (kit) {
            socket.emit("kit:creation:success", kit)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("kit:creation:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("kit:creation:failed", { error: error })
    }
}

const updateKit = async (socket: Socket, data: any) => {
    console.log("Kit atualizado:", data)

    try {
        const kit = await databaseHandler.update(data)

        if (kit) {
            socket.emit("kit:update:success", kit)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("kit:update:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("kit:update:failed", { error: error })
    }
}

const listKit = async (socket: Socket) => {
    console.log("Lista de kits")
    const kit = await databaseHandler.list()
    socket.emit("kit:list:success", kit)
}

const addEmployeeKit = async (socket: Socket, data: any) => {
    console.log("Adicionando funcionário ao kit:", data)

    try {
        const kit = await databaseHandler.add(data)

        if (kit) {
            socket.emit("kit:addEmployee:success", kit)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("kit:addEmployee:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("kit:addEmployee:failed", { error: error })
    }
}

const removeEmployeeKit = async (socket: Socket, data: any) => {
    console.log("Removendo funcionário do kit:", data)

    try {
        const kit = await databaseHandler.remove(data)

        if (kit) {
            socket.emit("kit:removeEmployee:success", kit)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("kit:removeEmployee:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("kit:removeEmployee:failed", { error: error })
    }
}

export default {
    newKit,
    updateKit,
    listKit,
    addEmployeeKit,
    removeEmployeeKit,
}
