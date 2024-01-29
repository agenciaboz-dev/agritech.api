import { Kit, Object, Employee, Calls, Calendar } from "@prisma/client"

declare interface NewKit {
    image: string
    image64: string
    name: string
    description: string
    hectareDay: number
    active: boolean
    objects?: Object[]
    employees?: Employee[]
    calls?: Call[]
    // Maybe change the calendar
    calendar?: Calendar
}

declare interface ManageKitMembers {
    kitId: number
    employeeId: number
}
