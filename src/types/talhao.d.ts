import { Talhao, Coordinate, Gallery, Call } from "@prisma/client"
import { NewGallery } from "./gallery"


declare interface NewTalhao {
    id: number
    name: string
    area: number
    tillageId: number
    location: Coordinate[]
    cover?: string
    gallery: NewGallery[]
    calls: Call[]
}
