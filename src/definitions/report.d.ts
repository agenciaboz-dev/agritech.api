import { Report, Producer, Operation, Treatment, Material, TechReport } from "@prisma/client"

declare interface NewReport {
    id: number
    callId: number
    producer: Producer
    operation: Operation
    treatment: Treatment
    material: Material[]
    techReport: TechReport
}

declare interface ReportProducer {
    id: number
    cnpj: string
    contract: boolean
    tillage?: Tillage[]
    employeeId?: number
    reportId?: number
    userid: number
    hectarePrice?: number
}
