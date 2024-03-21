import { Product } from "@prisma/client"

declare interface NewProduct {
    id: number
    name: string
    dosage: string
    treatmentId: number
}
