import { Prisma } from "@prisma/client"
import { getIoInstance } from "../io/socket"
import { Socket } from "socket.io"
import { prisma } from "../databaseHandler/prisma"
import databaseHandler from "../databaseHandler"

export const include = Prisma.validator<Prisma.NotificationInclude>()({ users: true })
export type NotificationPrisma = Prisma.NotificationGetPayload<{ include: typeof include }>
export type NewNotification = Omit<NotificationPrisma, "id" | "viewed_by" | "datetime">
export type NotificationKeyType = "employee" | "report" | "call" | "talhao" | "kit" | "tillage" | "admin" | "manager"
export type NotificationActionType = "close" | "approve" | "call" | "active" | "disabled" | "new" | "update"

export class NotificationClass {
    id: number
    action: NotificationActionType
    datetime: string

    target_key: NotificationKeyType
    target_id: number

    viewed_by: number[] = []

    users: number[] = []
    data: any

    constructor(data: NotificationPrisma, data2: any) {
        this.id = data.id
        this.action = data.action as NotificationActionType
        this.datetime = data.datetime
        this.target_key = data.target_key as NotificationKeyType
        this.target_id = data.target_id
        this.viewed_by = data.viewed_by.split(",").map((item) => Number(item))
        this.users = data.users.map((user) => user.id)
        this.data = data2
    }

    static async getData(id: number, key: NotificationKeyType) {
        const options = {
            employee: async (id: number) => {
                const result = await databaseHandler.user.findById(id)
                // console.log(1)
                return result?.employee
            },
            report: async (id: number) => {
                const result = await databaseHandler.report.find(id)
                // console.log(2)

                return result
            },
            call: async (id: number) => {
                // console.log("Buscando dados de call com id:", id)
                const result = await databaseHandler.call.find(id)
                // console.log(3)
                // console.log("Resultado call:", result)
                return result
            },
            talhao: async (id: number) => {
                const result = await databaseHandler.talhao.find(id)
                // console.log(4)

                return result
            },
            kit: async (id: number) => {
                const result = await databaseHandler.kit.find(id)
                // console.log({ KIT: result?.name })

                return result
            },
            tillage: async (id: number) => {
                const result = await databaseHandler.tillage.find(id)
                // console.log(6)

                return result
            },
            admin: async (id: number) => {
                const result = await databaseHandler.user.findById(id)
                // console.log(7)

                return result
            },
            manager: async (id: number) => {
                const result = await databaseHandler.user.findById(id)
                // console.log(8)

                // console.log("Resultado manager:", result)
                return result
            },
        }

        const getDataOption = options[key]
        const data = await getDataOption(id)
        if (!data) {
            console.log(`Dados retornados como undefined para key: ${key}, id: ${id}`)
        }
        return data
    }

    static async new(data: NewNotification) {
        const io = getIoInstance()

        try {
            const notification_prisma = await prisma.notification.create({
                data: {
                    ...data,
                    datetime: new Date().getTime().toString(),
                    viewed_by: "",
                    users: { connect: data.users.map((user) => ({ id: user.id })) },
                },
                include,
            })

            const notification_data = await NotificationClass.getData(data.target_id, data.target_key as NotificationKeyType)

            const notification = new NotificationClass(notification_prisma, notification_data)
            io.emit("notification:new", notification)
        } catch (error) {
            console.log(error)
        }
    }

    static async load(id: number) {
        const notification = await prisma.notification.findUnique({ where: { id }, include })
        if (!notification) throw "notificação não encontrada"

        const data = await NotificationClass.getData(id, notification.target_key as NotificationKeyType)

        return new NotificationClass(notification, data)
    }

    static async viewed(socket: Socket, id: number, user_id: number) {
        const notification = await NotificationClass.load(id)
        if (notification.viewed_by.includes(user_id)) throw "notificação já vista por esse usuário"
        notification.viewed_by.push(user_id)
        const updated = await prisma.notification.update({
            where: { id },
            data: { viewed_by: notification.viewed_by.toString() },
        })
        socket.emit("notification:viewed")
    }

    static async list(socket: Socket, user_id: number) {
        try {
            const notificationsFromDb = await prisma.notification.findMany({
                where: { users: { some: { id: user_id } } },
                include,
            })

            const notifications = await Promise.all(
                notificationsFromDb.map(async (item) => {
                    // console.log("Dentro do map - Antes de NotificationClass.getData", item.id)
                    const data = await NotificationClass.getData(item.target_id, item.target_key as NotificationKeyType)
                    // console.log("Dentro do map - Depois de NotificationClass.getData", data)
                    return new NotificationClass(item, data)
                })
            )

            console.log(notifications)
            socket.emit("notification:list", notifications)
        } catch (error) {
            console.error("Erro na função list:", error)
        }
    }
}

export class Notification {
    constructor(data: NewNotification) {
        NotificationClass.new(data)
    }

    static async getAdmins() {
        return await prisma.user.findMany({ where: { isAdmin: true } })
    }
}
