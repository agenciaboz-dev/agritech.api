import { Address, Coordinate, Producer, Gallery, Tillage } from "@prisma/client"
declare interface NewTillage {
    name: string
    area: number
    owner: string
    ceo: string
    manager?: string
    agronomist?: string
    technician?: string
    pilot?: string
    others?: string
    comments?: string
    hectarePrice: number
    address: {
        street: string
        district: string
        number: string
        city: string
        cep: string
        uf: string
        adjunct?: string
    }
    location?: Coordinate[]
    cover?: string
    gallery?: NewGallery[]
    talhao?: Talhao[]
    call?: Call
    producerId: number
}

declare interface Tillage extends NewTillage {}
