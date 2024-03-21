import { Material } from "@prisma/client"

declare interface NewMaterial {
    talhao: string
    area: number
    product: string
    dosage: string
    classification: string
    total: string
    removed: string
    applied: string
    returned: string
    comments: string
    reportId: number
}
