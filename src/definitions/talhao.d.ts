import { Talhao, Coordinate, Gallery, Call } from "@prisma/client"

declare interface NewTalhao {
    id: number
    name: string
    area: number
    tillageId: number
    location: Coordinate[]
    gallery: Gallery[]
    calls: Call[]
}
