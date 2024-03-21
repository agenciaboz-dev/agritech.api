import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/stage"
import { NewStage } from "../types/stage"

const newStage = async (socket: Socket, data: NewStage, stage_number: number) => {
    console.log("new stage")
    try {
        const report = await databaseHandler.create(data, stage_number)
        socket.emit("stage:new", report)
    } catch (error) {
        console.log(error)
        socket.emit("stage:new:error", { error: error })
    }
}

export default {
    newStage,
}
