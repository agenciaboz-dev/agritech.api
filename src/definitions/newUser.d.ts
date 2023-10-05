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
    address: Address

    employee?: Employee
    producer?: Producer
}
