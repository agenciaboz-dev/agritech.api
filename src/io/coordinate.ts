import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/coordinate"

const newCoordinate = async (socket: Socket, data: any) => {
    console.log("Nova Coordenada:", data)

    try {
        const coordinate = await databaseHandler.create(data)

        if (coordinate) {
            socket.emit("coordinate:creation:success", coordinate)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("coordinate:creation:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("coordinate:update:failed", { error: error })
    }
}

const updateCoordinate = async (socket: Socket, data: any) => {
    console.log("Coordenada atualizada:", data)

    try {
        const coordinate = await databaseHandler.update(data)

        if (coordinate) {
            socket.emit("coordinate:update:success", coordinate)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("coordinate:update:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("coordinate:update:failed", { error: error })
    }
}

const listCoordinate = async (socket: Socket) => {
    console.log("Lista de coordenadas")
    const coordinate = await databaseHandler.list()
    socket.emit("coordinate:list:success", coordinate)
}

export default {
    newCoordinate,
    updateCoordinate,
    listCoordinate,
}
