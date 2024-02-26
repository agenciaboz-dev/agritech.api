import { Server as SocketIoServer } from "socket.io"
import { Server as HttpServer } from "http"
import { Server as HttpsServer } from "https"

import { Socket } from "socket.io"
import cep from "./geolocalTest"
import weather from "./weatherApi"

import { Client, ClientBag } from "../definitions/client"
import { LoginForm } from "../definitions/user"

import user from "./user"
import tillage from "./tillage"
import coordinate from "./coordinate"
import kit from "./kit"
import object from "./object"
import gallery from "./gallery"
import calendar from "./calendar"
import call from "./call"
import chat from "./chat"
import bank from "./bank"
import report from "./report"
import talhao from "./talhao"
import stage from "./stage"
import operation from "./operation"
import material from "./material"
import flight from "./flight"
import product from "./product"
import treatment from "./treatment"
import techReport from "./techReport"

import {
    User,
    Tillage,
    Coordinate,
    Gallery,
    Kit,
    Object,
    Calendar,
    Call,
    Chat,
    Bank,
    Stage,
    Report,
    Talhao,
} from "@prisma/client"
import { NewGallery } from "../definitions/gallery"

let io: SocketIoServer | null = null

export const initializeIoServer = (server: HttpServer | HttpsServer) => {
    io = new SocketIoServer(server, {
        cors: { origin: "*" },
        maxHttpBufferSize: 1e8,
    })
}

export const getIoInstance = () => {
    if (!io) {
        throw new Error("Socket.IO has not been initialized. Please call initializeIoServer first.")
    }
    return io
}

export let clientList: Client[] = []

const get = (socket: Socket) => clientList.find((client) => client.socket == socket)
const find = (id: number) => clientList.find((client) => client.user.id == id)
const getUser = (client: Client) => client.user
const list = () => clientList.map((client) => client.user)

const remove = (client: Client | undefined) => {
    if (!client) return
    clientList = clientList.filter((item) => item.socket != client.socket)
}

const add = (client: Client) => {
    const exists = find(client.user.id)
    if (exists) remove(client)

    clientList.push(client)
}

const update = (client: Client, user: User) =>
    (clientList = [...clientList.filter((item) => item.socket != client.socket), { ...client, user }])

export const handleSocket = (socket: Socket) => {
    const io = getIoInstance()

    const clients: ClientBag = {
        get,
        find,
        getUser,
        list,
        add,
        remove,
        update,
    }
    console.log(`new connection:${socket.id}`)

    socket.on("disconnect", () => {
        console.log(`disconnected: ${socket.id}`)
        const client = clients.get(socket)
        if (client) {
            user.logout(socket, clients, client.user)
        }
    })

    //USER OPS
    socket.on("user:logout", (data) => user.logout(socket, clients, data))
    socket.on("user:signup", (newUser: User) => user.newUser(socket, newUser))
    socket.on("user:newEmployee", (newEmployee: User) => user.newEmployee(socket, newEmployee))
    socket.on("user:reject", (id) => user.reject(socket, id))
    socket.on("user:approve", (id) => user.approve(socket, id))
    socket.on("user:login", (data: LoginForm) => user.handleLogin(socket, data))
    socket.on("user:find", (id: number) => user.findUser(socket, id))
    socket.on("users:list", () => user.listUsersApproved(socket))
    // socket.on("user:list", (userId: number) => user.findUser(socket, { userId }));
    socket.on("user:update", (updateUser: User, userId: number) => user.updateUser(socket, updateUser))
    socket.on("user:pendingApproval", () => user.listPendingApproval(socket))
    socket.on("user:toggle:admin", (data: User) => user.toggleAdmin(socket, data))
    socket.on("user:toggle:manager", (data: User) => user.toggleManager(socket, data))

    // TILLAGE OPS
    socket.on("tillage:create", (newTillage: Tillage) => tillage.newTillage(socket, newTillage))
    socket.on("tillage:update", (updateTillage: Tillage) => tillage.updateTillage(socket, updateTillage))

    socket.on("tillage:list", () => tillage.listTillage(socket))

    // TALHAO OPS
    socket.on("talhao:create", (newTalhao: Talhao) => talhao.newTalhao(socket, newTalhao))

    socket.on("talhao:update", (updateTalhao: Talhao) => talhao.updateTalhao(socket, updateTalhao))

    socket.on("talhao:find", (talhaoId: number) => talhao.findTalhao(socket, talhaoId))

    socket.on("talhao:list", () => talhao.listTalhao(socket))

    // COORDINATE OPS
    socket.on("coordinate:create", (newCoorinate: Coordinate) => coordinate.newCoordinate(socket, newCoorinate))

    socket.on("coordinate:cep", (data: string) => cep.coordinateCep(socket, data))

    socket.on("weather:find", (data: any) => weather.climate(socket, data))

    socket.on("coordinate:update", (updateCoordinate: Coordinate) => coordinate.updateCoordinate(socket, updateCoordinate))

    socket.on("coordinate:find", (id: number) => coordinate.findCoordinate(socket, id))

    socket.on("coordinate:list", () => {
        coordinate.listCoordinate(socket)
    })

    // GALLERY OPS
    socket.on("gallery:create", (newGallery: Gallery) => gallery.newGallery(socket, newGallery))

    socket.on("gallery:update", (updateGallery: NewGallery) => gallery.updateGallery(socket, updateGallery))

    socket.on("gallery:list", () => {
        gallery.listGallery(socket)
    })

    // KIT OPS
    socket.on("kit:create", (newKit: Kit) => kit.newKit(socket, newKit))

    socket.on("kit:update", (updateKit: Kit) => kit.updateKit(socket, updateKit))

    socket.on("kit:list", () => {
        kit.listKit(socket)
    })

    socket.on("kit:toggle", (data: Kit) => kit.activateKit(socket, data))

    socket.on("kit:add:employee", (manageKit: Kit) => kit.addEmployeeKit(socket, manageKit))

    socket.on("kit:remove:employee", (manageKit: Kit) => kit.removeEmployeeKit(socket, manageKit))

    // OBJECT OPS
    socket.on("object:create", (newObject: Object) => object.newObject(socket, newObject))

    socket.on("object:update", (updateObject: Object) => object.updateObject(socket, updateObject))

    socket.on("object:list", () => {
        object.listObject(socket)
    })

    // CALENDAR OPS
    // socket.on("employee:calendar:create", (newEmpCalendar: Calendar) =>
    //   calendar.newCalendarEmp(socket, newEmpCalendar)
    // );

    // socket.on("kit:calendar:create", (newKitCalendar: Calendar) =>
    //   calendar.newCalendarKit(socket, newKitCalendar)
    // );

    socket.on("calendar:update", (updateCalendar: Calendar) => calendar.updateCalendar(socket, updateCalendar))

    socket.on("calendar:list", () => {
        calendar.listCalendar(socket)
    })

    // CALL OPS
    socket.on("admin:call:create", (newCall: Call) => call.newAdminCall(socket, newCall))

    socket.on("call:create", (newCall: Call) => call.newCall(socket, newCall))
    socket.on("call:update", (updateCall: Call) => call.updateCall(socket, updateCall))
    socket.on("call:approve", (data: any) => call.approveCall(socket, data))
    socket.on("call:list", () => call.listCall(socket))
    socket.on("call:listPending", () => call.listCallPending(socket))
    socket.on("call:listApproved", () => call.listCallApproved(socket))
    socket.on("call:cancel", (data: any) => call.cancelCall(socket, data))
    socket.on("call:close", (data: any) => call.closeCall(socket, data))

    // CHAT OPS
    socket.on("chat:new", (data1: any, data2: any) => chat.newChat(socket, data1, data2))

    // BANK OPS
    socket.on("bank:create", (newBank: Bank) => bank.newBank(socket, newBank))
    socket.on("bank:update", (updateBank: Bank) => bank.updateBank(socket, updateBank))
    socket.on("bank:list", () => {
        bank.listBank(socket)
    })

    socket.on("bank:find", (bankId: number) => bank.findBank(socket, bankId))

    // STAGE OPS
    socket.on("stage:update:one", (stageUpdate: Stage) => stage.updateStageOne(socket, stageUpdate))
    socket.on("stage:update:two", (stageUpdate: Stage) => stage.updateStageTwo(socket, stageUpdate))
    socket.on("stage:update:three", (stageUpdate: Stage) => stage.updateStageThree(socket, stageUpdate))

    // OPERATION OPS
    socket.on("operation:create", (data: any) => operation.newOperation(socket, data))
    socket.on("operation:update", (data: any) => operation.updateOperation(socket, data))
    socket.on("operation:list", () => operation.listOperation(socket))

    socket.on("operation:find", (id: number) => operation.findOperation(socket, id))

    // MATERIAL OPS
    socket.on("material:create", (data: any) => material.newMaterial(socket, data))

    socket.on("material:update", (data: any) => material.updateMaterial(socket, data))

    socket.on("material:find", (id: number) => material.findMaterial(socket, id))

    socket.on("material:list", () => material.listMaterial(socket))

    // FLIGHT OPS
    socket.on("flight:create", (data: any) => flight.newFlight(socket, data))
    socket.on("flight:update", (data: any) => flight.updateFlight(socket, data))
    socket.on("flight:list", () => flight.listFlight(socket))
    socket.on("flight:find", (id: number) => flight.findFlight(socket, id))

    // PRODUCT OPS
    socket.on("product:create", (data: any) => product.newProduct(socket, data))
    socket.on("product:update", (data: any) => product.updateProduct(socket, data))
    socket.on("product:list", () => product.listProduct(socket))
    socket.on("product:find", (id: number) => product.findProduct(socket, id))

    // TREATMENT OPS
    socket.on("treatment:create", (data: any) => treatment.newTreatment(socket, data))
    socket.on("treatment:update", (data: any) => treatment.updateTreatment(socket, data))
    socket.on("treatment:list", () => treatment.listTreatment(socket))
    socket.on("treatment:find", (id: number) => treatment.findTreatment(socket, id))

    // TECHREPORT OPS

    socket.on("techReport:create", (data: any) => techReport.newTechReport(socket, data))

    socket.on("techReport:update", (data: any) => techReport.updateTechReport(socket, data))

    socket.on("techReport:find", (techReportId: number) => techReport.findTechReport(socket, techReportId))

    socket.on("techReport:list", () => techReport.listTechReport(socket))

    // REPORT OPS

    socket.on("report:create", (data: any) => report.newReport(socket, data))

    socket.on("report:update", (data: any) => report.updateReport(socket, data))

    socket.on("report:find", (id: number) => report.findReport(socket, id))

    socket.on("report:list", () => report.listReport(socket))

    socket.on("midnight:report:create", (data: any) => report.createNewReportAtMidnight(socket, data))

    socket.on("report:approve", (reportId: number) => report.approvedReport(socket, reportId))

    socket.on("report:close", (reportId: number) => report.closeReport(socket, reportId))
}
