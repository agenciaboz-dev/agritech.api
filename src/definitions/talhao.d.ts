import { Talhao, Coordinate, Gallery, Call } from "@prisma/client"

declare interface NewTalhao {
    id: number
    name: string
    area: number
    tillageId: number
    location: Coordinate[]
    cover?: string
    gallery: Gallery[]
    calls: Call[]
}
