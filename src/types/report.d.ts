import { Report, Producer, Operation, Material, Flight, Call, Talhao } from "@prisma/client"

declare interface Flight {
    id: number
    humidity: number
    wind_velocity: number
    height: number
    faixa: number
    flight_velocity: number
    tank_volume: number
    rate: number
    performance: number
}

declare interface Product {
    id: number
    name: string
    dosage: string
    unit: string
}

declare interface TechReport {
    id: number
    date: string
    init: string
    finish: string
    comments: string
    flight: Flight[]
}

declare interface Treatment {
    id: number
    products: Product[]
}

declare interface NewReport {
    id: number
    call: Call
    callId: number
    areaTrabalhada: number
    date?: string
    hour?: string
    operation: Operation
    treatment: Treatment
    material: Material[]
    techReport: TechReport
    approved?: boolean
    totalPrice?: number
}
