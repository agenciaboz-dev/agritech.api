import { prisma } from "../src/databaseHandler/prisma"

require("dotenv").config()

const findUsers = async () => {
    try {
        const credentials = (await prisma.user.findMany()).flatMap((user) => user)

        console.log(`\nCREDENCIAIS DOS USUARIOS:\n`)
        credentials.forEach((user, index) => {
            console.log(`User: ${user.name} \nID: ${user.id} \nLogin: ${user.email} \nPassword: ${user.password}\nAdmin:${user.isAdmin}\n`)
        })
    } catch (error) {
        console.error("Erro ao buscar lista de credenciais dos usuários:", error)
    } finally {
        await prisma.$disconnect() // Disconnect from the Prisma client
    }
}

findUsers()
