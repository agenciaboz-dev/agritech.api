import { Prisma, PrismaClient } from "@prisma/client"
import { User } from "../types/user"
import { getIoInstance } from "../io/socket"
import { Socket } from "socket.io"

export const include = Prisma.validator<Prisma.NotificationInclude>()({ users: true })
export type NotificationPrisma = Prisma.NotificationGetPayload<{ include: typeof include }>
export type NewNotification = Omit<NotificationPrisma, "id" | "viewed_by" | "datetime">

const prisma = new PrismaClient()

export class NotificationClass {
    id: number
    action: string
    datetime: string

    target_key: string
    target_id: number

    viewed_by: number[] = []

    users: number[] = []

    constructor(data: NotificationPrisma) {
        this.id = data.id
        this.action = data.action
        this.datetime = data.datetime
        this.target_key = data.target_key
        this.target_id = data.target_id
        this.viewed_by = data.viewed_by.split(",").map((item) => Number(item))
        this.users = data.users.map((user) => user.id)
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
            const notification = new NotificationClass(notification_prisma)
            io.emit("notification:new", notification)
        } catch (error) {
            console.log(error)
        }
    }

    static async load(id: number) {
        const notification = await prisma.notification.findUnique({ where: { id }, include })
        if (!notification) throw "notificação não encontrada"

        return new NotificationClass(notification)
    }

    static async viewed(socket: Socket, id: number, user_id: number) {
        const notification = await NotificationClass.load(id)
        if (notification.viewed_by.includes(user_id)) throw "notificação já vista por esse usuário"
        notification.viewed_by.push(user_id)
        const updated = await prisma.notification.update({ where: { id }, data: { viewed_by: notification.viewed_by.toString() } })
        socket.emit("notification:viewed")
    }

    static async list(socket: Socket, user_id: number) {
        const notifications = await Promise.all(
            (await prisma.notification.findMany({ where: { users: { some: { id: user_id } } }, include })).map((item) => new NotificationClass(item))
        )
        socket.emit("notification:list", notifications)
    }
}

export class Notification {
    constructor(data: NewNotification) {
        NotificationClass.new(data)
    }
}
