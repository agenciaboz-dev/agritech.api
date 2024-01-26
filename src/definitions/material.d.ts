import { Material } from "@prisma/client"

declare interface NewMaterial {
    talhao: string
    area: number
    product: string
    dosage: number
    classification: string
    total: number
    removed: number
    applied: number
    returned: number
    comments: string
    reportId: number
}
