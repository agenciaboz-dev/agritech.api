import { Address, Employee, Producer } from "@prisma/client"

declare interface NewUser {
    username: string
    email: string
    password: string
    name: string
    cpf: string
    birth: string
    phone: string
    image: string
    image64: string
    isAdmin: boolean
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
        bank_data: {
            account: string
            type: string
            name: string
            agency: string
        }
    }
    producer?: { cnpj: string; tillage: Tillage }
}

declare interface LoginForm {
    login: string
    password: string
}
