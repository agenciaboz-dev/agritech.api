import { Call, Report, Stage } from "@prisma/client"

declare interface OpenCall {
    open: Date
    comments: string
    approved: boolean
    stages?: Stage[]

    kitId?: number
    producerId: number
    userId: number
}

declare interface CloseCall {
    finish: Date
}
