import { Operation } from "@prisma/client"

declare interface NewOperation {
    culture: string
    areaMap: number
    equipment: string
    model: string
    service: string
    reportId: number
}
