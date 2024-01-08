import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/calendar"

const newCalendarEmp = async (socket: Socket, data: any) => {
    console.log("Novo Calendario:", data)

    try {
        const calendar = await databaseHandler.createEmp(data)

        if (calendar) {
            socket.emit("calendar:creation:success", calendar)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("calendar:creation:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("calendar:update:failed", { error: error })
    }
}

const newCalendarKit = async (socket: Socket, data: any) => {
    console.log("Novo Calendario:", data)

    try {
        const calendar = await databaseHandler.createKit(data)

        if (calendar) {
            socket.emit("calendar:creation:success", calendar)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("calendar:creation:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("calendar:update:failed", { error: error })
    }
}

const updateCalendar = async (socket: Socket, data: any) => {
    console.log("Calendario atualizado:", data)

    try {
        const object = await databaseHandler.update(data)

        if (object) {
            socket.emit("calendar:update:success", object)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("calendar:update:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("calendar:update:failed", { error: error })
    }
}

const listCalendar = async (socket: Socket) => {
    console.log("Lista de calendarios")
    const calendar = await databaseHandler.list()
    socket.emit("calendar:list:success", calendar)
}

export default {
    newCalendarEmp,
    newCalendarKit,
    updateCalendar,
    listCalendar,
}
