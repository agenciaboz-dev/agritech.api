import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/object"

const newObject = async (socket: Socket, data: any) => {
    console.log("Novo Objeto:", data)

    try {
        const object = await databaseHandler.create(data)

        if (object) {
            socket.emit("object:creation:success", object)
        } else {
            socket.emit("object:creation:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("object:update:failed", { error: error })
    }
}

const updateObject = async (socket: Socket, data: any) => {
    console.log("Objeto atualizado:", data)

    try {
        const object = await databaseHandler.update(data)

        if (object) {
            socket.emit("object:update:success", object)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("object:update:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("object:update:failed", { error: error })
    }
}

const listObject = async (socket: Socket) => {
    console.log("Lista de objetos")
    const object = await databaseHandler.list()
    socket.emit("object:list:success", object)
}

export default {
    newObject,
    updateObject,
    listObject,
}
