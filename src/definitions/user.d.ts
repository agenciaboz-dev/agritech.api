import { Address, Employee, Producer } from "@prisma/client"

declare interface NewUser {
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string
    phone: string
    image: Image
    isAdmin: boolean
    isManager: boolean
    approved: boolean
    rejected: string
    office: string
    address: {
        street: string
        district: string
        number: string
        city: string
        cep: string
        uf: string
        adjunct?: string
    }

    employee?: {
        rg: string
        gender: string
        nationality: string
        relationship: string
        voter_card: string
        work_card: string
        military: string
        residence: string
        bank: {
            account: string
            type: string
            name: string
            agency: string
        }
        professional?: {
            salary?: number
            admission: string
        }
    }
    producer?: {
        cnpj: string
        tillage: Tillage
        contract: boolean
        employeeId: number
    }
}

declare interface User extends NewUser {
    kit?: Kit
    kitId: number
    producers?: Producer[]
    calendars?: Calendar[]
}
declare interface LoginForm {
    login: string
    password: string
}

declare interface Image {
    file: ArrayBuffer
    name: string
}
