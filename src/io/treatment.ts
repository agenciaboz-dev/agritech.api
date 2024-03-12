import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/treatment"
import { Report, Treatment } from "@prisma/client"
import { NewTreatment } from "../types/treatment"

const newTreatment = async (socket: Socket, data: NewTreatment) => {
    console.log(data)
    try {
        const treatment = await databaseHandler.create(data)
        socket.emit("treatment:creation:success", treatment)
    } catch (error) {
        console.log(error)
        socket.emit("treatment:creation:failed", { error: error })
    }
}

const updateTreatment = async (socket: Socket, data: NewTreatment) => {
    console.log(data)
    try {
        const treatment = await databaseHandler.update(data)
        socket.emit("treatment:update:success", treatment)
    } catch (error) {
        console.log(error)
        socket.emit("treatment:update:failed", { error: error })
    }
}

const findTreatment = async (socket: Socket, id: number) => {
    try {
        const treatment = await databaseHandler.find(id)
        socket.emit("treatment:find:success", treatment)
    } catch (error) {
        console.error(`Error fetching treatment for ID: ${id}. Error: ${error}`)
        socket.emit("treatment:find:error", { error: error })
    }
}

const listTreatment = async (socket: Socket) => {
    try {
        const treatments = await databaseHandler.list()
        socket.emit("treatment:list:success", treatments)
    } catch (error) {
        console.error(`Error fetching treatments. Error: ${error}`)
        socket.emit("treatment:list:error", { error: error })
    }
}

export default {
    newTreatment,
    updateTreatment,
    findTreatment,
    listTreatment,
}
