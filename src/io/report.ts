import { Socket } from "socket.io"
import databaseHandler, { closing_report_include } from "../databaseHandler/report"
import { NewReport } from "../types/report"
import { NewMaterial } from "../types/material"
import { Notification } from "../class/Notification"
import pdf_handler from "../tools/pdf_handler"
import { existsSync, mkdirSync } from "fs"
import { PrismaClient } from "@prisma/client"
import { env } from "../env"

const prisma = new PrismaClient()

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
        const report = await databaseHandler.close(reportId)
        new Notification({ action: "close", target_id: report.id, target_key: "report", users: await Notification.getAdmins() })

        const output_dir = `static/reports/${report.id}`
        if (!existsSync(output_dir)) {
            mkdirSync(output_dir, { recursive: true })
        }

        const report_index = report.call.reports.findIndex((item) => item.id == report.id)
        const filename = `Relatório ${report_index + 1} do talhão ${report.call.talhao.name}.pdf`
        const file_path = `${output_dir}/${filename}`
        const port = process.env.PORT
        const url = `${env == "dev" ? `http://localhost:${port}` : `https://agencyboz.com:${port}`}/${file_path}`

        // report.call.kit.employees.forEach((item, index) => {
        //     const pilot = item.office == 'pilot'
        //     item.user.name = pilot ?
        // })

        await pdf_handler.fillForm({
            template_path: "src/templates/report_template.pdf",
            output_path: file_path,
            report,
        })

        const updated_report = await prisma.report.update({ where: { id: report.id }, data: { pdf_path: url }, include: closing_report_include })
        socket.emit("report:closed:success", updated_report)
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
