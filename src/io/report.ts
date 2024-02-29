import { Socket } from "socket.io"
import databaseHandler from "../databaseHandler/report"
import { Report } from "@prisma/client"
import { NewReport } from "../types/report"
import { NewMaterial } from "../types/material"
import { Notification } from "../class/Notification"

const newReport = async (socket: Socket, data: NewReport) => {
    console.log(data)

    try {
        const report = await databaseHandler.create(data)
        socket.emit("report:creation:success", report)
    } catch (error) {
        console.log(error)
        socket.emit("report:creation:failed", { error: error })
    }
}

const approvedReport = async (socket: Socket, reportId: number) => {
    try {
        const report = await databaseHandler.approve(reportId)
        socket.emit("report:approved:success", report)

        const employees = report.call.kit.employees.map((item) => item.user)
        new Notification({ action: "approve", target_id: report.id, target_key: "report", users: [...employees, report.call.producer.user] })
    } catch (error) {
        console.log(error)
        socket.emit("report:approved:failed", { error: error })
    }
}
const closeReport = async (socket: Socket, reportId: number) => {
    try {
        const report = await databaseHandler.approve(reportId)
        socket.emit("report:closed:success", report)
        new Notification({ action: "close", target_id: report.id, target_key: "report", users: await Notification.getAdmins() })
    } catch (error) {
        console.log(error)
        socket.emit("report:closed:failed", { error: error })
    }
}

const updateReport = async (socket: Socket, data: { reportId: number; totalPrice: number; areaTrabalhada: number; materials: NewMaterial[] }) => {
    console.log(data)

    try {
        const report = await databaseHandler.update(data)

        socket.emit("report:update:success", report)
    } catch (error) {
        console.log(error)
        socket.emit("report:update:failed", { error: error })
    }
}

const findReport = async (socket: Socket, id: number) => {
    try {
        const report = await databaseHandler.find(id)
        socket.emit("report:find:success", report)
    } catch (error) {
        console.error(`Error fetching report for ID: ${id}. Error: ${error}`)
        socket.emit("report:find:error", { error: error })
    }
}

const listReport = async (socket: Socket) => {
    try {
        const report = await databaseHandler.list()
        socket.emit("report:list:success", report)
    } catch (error) {
        console.log(error)
        socket.emit("report:list:failed", { error: error })
    }
}

const createNewReportAtMidnight = async (socket: Socket, data: NewReport) => {
    try {
        const report = await databaseHandler.createNewReportAtMidnight(data)
        socket.emit("midnight:report:creation:success", report)
    } catch (error) {
        console.log(error)
        socket.emit("midnightreport:creation:failed", { error: error })
    }
}

export default {
    newReport,
    updateReport,
    findReport,
    listReport,
    createNewReportAtMidnight,
    approvedReport,
    closeReport,
}
