import { Prisma } from "@prisma/client"
import { Image } from "../../types/user"

export const user_include = Prisma.validator<Prisma.UserInclude>()({
    producer: {
        include: {
            tillage: {
                include: {
                    address: true,
                    location: true,
                    gallery: true,
                    talhao: { include: { calls: true } },
                },
            },
        },
    },
    employee: {
        include: {
            bank: true,
            professional: true,
            calendars: true,
            producers: true,
            kits: { include: { calls: true } },
        },
    },
    address: true,
})

export type UserFull = Omit<Prisma.UserGetPayload<{ include: typeof user_include }>, "image"> & { image: string | Image }
