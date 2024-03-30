import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/kit"
import { Kit } from "@prisma/client"
import { Notification } from "../class/Notification"

const newKit = async (socket: Socket, data: any) => {
    console.log("Kit recebido:", data)

    try {
        const kit = await databaseHandler.create(data)
        socket.emit("kit:creation:success", kit)
        socket.broadcast.emit("kit:new", kit)

        if (kit) {
            const users = kit.employees.map((employee) => employee.user)
            new Notification({ action: "new", target_id: kit.id, target_key: "kit", users })
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
        socket.emit("kit:update:success", kit)
        socket.broadcast.emit("kit:update", kit)

        if (kit) {
            const users = kit.employees.map((employee) => employee.user)
            new Notification({ action: "update", target_id: kit.id, target_key: "kit", users })
        }
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Id não encontrado"
        socket.emit("kit:update:failed", { error: message })
        console.log(message)
    }
}

const listKit = async (socket: Socket) => {
    const kit = await databaseHandler.list()
    socket.emit("kit:list:success", kit)
}

const activateKit = async (socket: Socket, data: Kit) => {
    console.log(data)

    try {
        const kit = await databaseHandler.toggle(data.id)
        socket.emit("kit:toggle:success", kit)
        socket.broadcast.emit("kit:update", kit)

        if (kit) {
            const users = kit.employees.map((employee) => employee.user)
            kit.active
                ? new Notification({ action: "active", target_id: kit.id, target_key: "kit", users })
                : new Notification({ action: "disabled", target_id: kit.id, target_key: "kit", users })
        }
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Id não encontrado"
        socket.emit("kit:toggle:failed", { error: message })
        console.log(message)
    }
}

const addEmployeeKit = async (socket: Socket, data: any) => {
    console.log(data)

    try {
        const kit = await databaseHandler.add(data)
        socket.emit("kit:addEmployee:success", kit)
    } catch (error: any) {
        let message = error
        if (error.code === "P2016") message = "Algum dos id's não foi encontrado"
        socket.emit("kit:addEmployee:failed", { error: message })
        console.log(message)
    }
}

const removeEmployeeKit = async (socket: Socket, data: any) => {
    console.log(data)

    try {
        const kit = await databaseHandler.remove(data)
        socket.emit("kit:removeEmployee:success", kit)
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
    activateKit,
    addEmployeeKit,
    removeEmployeeKit,
}
