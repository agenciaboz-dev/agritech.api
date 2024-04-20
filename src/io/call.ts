import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/call"
import tillage from "../databaseHandler/tillage"
import { Call, User } from "@prisma/client"
import { ApproveCall, OpenCall } from "../types/call"
import { Notification } from "../class/Notification"

const newAdminCall = async (socket: Socket, data: any) => {
    try {
        const call = await databaseHandler.adminCreate(data)
        socket.emit("adminCall:creation:success", call)
        socket.broadcast.emit("call:new", call)

        const employees = call.kit?.employees.map((item) => item.user)
        if (employees)
            new Notification({
                action: "new",
                target_id: call.id,
                target_key: "call",
                users: [call.producer?.user, ...employees],
            })
    } catch (error) {
        console.log(error)
        socket.emit("adminCall:creation:failed", { error: error })
    }
}

const newCall = async (socket: Socket, data: any) => {
    console.log(data)

    try {
        const call = await databaseHandler.create(data)
        socket.emit("call:creation:success", call)
        socket.broadcast.emit("call:new", call)

        const user = call.call.user
        const admins = await Notification.getAdmins()
        new Notification({
            action: "new",
            target_id: call.call.id,
            target_key: "call",
            users: user.producer ? admins : [...admins, call.call.producer.user],
        })
    } catch (error) {
        console.log(error)
        socket.emit("call:creation:failed", { error: error })
    }
}

const updateCall = async (socket: Socket, data: any) => {
    console.log(data)

    try {
        const call = await databaseHandler.update(data)
        socket.emit("call:update:success", call)
        socket.broadcast.emit("call:update", call)
    } catch (error) {
        console.log(error)
        socket.emit("call:update:failed", { error: error })
    }
}

const approveCall = async (socket: Socket, data: ApproveCall) => {
    console.log(data)

    try {
        const call = await databaseHandler.approve(data)
        socket.emit("call:approve:success", call)
        socket.emit("report:creation:success", call.report)
        socket.broadcast.emit("call:approved", call)

        const employees = call.call.kit?.employees.map((item) => item.user)
        if (employees)
            new Notification({
                action: "approve",
                target_id: call.call.id,
                target_key: "call",
                users: [...employees, call.call.producer.user],
            })
    } catch (error) {
        console.log(error)
        socket.emit("call:approve:failed", { error: error })
    }
}

const closeCall = async (socket: Socket, data: Call) => {
    console.log(data)

    try {
        const call = await databaseHandler.close(data)
        socket.emit("call:close:success", call)
        socket.broadcast.emit("call:closed", call)

        const employees = call.call.kit?.employees.map((item) => item.user)
        if (employees)
            new Notification({
                action: "close",
                target_id: call.call.id,
                target_key: "call",
                users: [...employees, call.call.producer.user],
            })
    } catch (error) {
        console.error(error)
        socket.emit("call:close:failed", { error: error })
    }
}

const cancelCall = async (socket: Socket, data: Call) => {
    console.log(data)

    try {
        const call = await databaseHandler.cancel(data)
        socket.emit("call:cancel:success", call)
        socket.broadcast.emit("call:cancel", call)
        // socket.emit("report:creation:success", report)
        console.log(call)
        const employees = call.call.kit?.employees.map((item) => item.user)
        if (employees)
            new Notification({
                action: "cancel",
                target_id: call.call.id,
                target_key: "call",
                users: [...employees, call.call.producer.user],
            })
    } catch (error) {
        console.log(error)
        socket.emit("call:cancel:failed", { error: error })
        // socket.emit("report:creation:failed", { error: error })
    }
}

const listCall = async (socket: Socket) => {
    try {
        const call = await databaseHandler.list()
        socket.emit("call:list:success", call)
        socket.broadcast.emit("call:list:success", call)
    } catch (error) {
        console.log(error)
    }
}
const listCallPending = async (socket: Socket) => {
    try {
        const call = await databaseHandler.listPending()
        socket.emit("call:listPending:success", call)
        socket.broadcast.emit("call:listPending:success", call)
    } catch (error) {
        console.log(error)
    }
}
const listCallApproved = async (socket: Socket, user: User) => {
    try {
        const call = await databaseHandler.listApproved(user)
        socket.emit("call:listApproved:success", call)
        socket.broadcast.emit("call:listApproved:success", call)
    } catch (error) {
        console.log(error)
    }
}

export default {
    newCall,
    newAdminCall,
    updateCall,
    approveCall,
    closeCall,
    cancelCall,
    listCall,
    listCallPending,
    listCallApproved,
}
