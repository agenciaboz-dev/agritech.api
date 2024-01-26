import { Report, Producer, Operation, Treatment, Material, TechReport } from "@prisma/client"

declare interface NewReport {
    id: number
    callId: number
    operation: Operation
    treatment: Treatment
    material: Material[]
    techReport: TechReport
}
