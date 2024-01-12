import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/kit"

const newKit = async (socket: Socket, data: any) => {
    console.log("Kit recebido:", data)

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
    console.log("Kit pra atualizar:", data)

    try {
        const kit = await databaseHandler.update(data)

        if (kit) {
            socket.emit("kit:update:success", kit)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("kit:update:failed")
            console.log("Erro de dados do Kit ou id não encontrado")
        }
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Id não encontrado"
        socket.emit("kit:update:failed", { error: message })
        console.log(message)
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
    } catch (error: any) {
        let message = error
        if (error.code === "P2016") message = "Algum dos id's não foi encontrado"
        socket.emit("kit:addEmployee:failed", { error: message })
        console.log(message)
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
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Algum id está incorreto"
        socket.emit("kit:removeEmployee:failed", { error: message })
        console.log(message)
    }
}

export default {
    newKit,
    updateKit,
    listKit,
    addEmployeeKit,
    removeEmployeeKit,
}
