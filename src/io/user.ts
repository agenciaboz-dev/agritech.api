import { Socket } from "socket.io"
import { User, Employee } from "@prisma/client"
import { getIoInstance, handleSocket } from "./socket"
import user from "../databaseHandler/user"
import { saveImage } from "../saveImage"
import { ClientBag } from "../definitions/client"
import { LoginForm } from "../definitions/user"

interface UpdateUser extends Omit<User, "id"> {
    id: number
}

const prisma = user

const logout = async (socket: Socket, clients: ClientBag, user: User) => {
    const io = getIoInstance()

    io.emit("user:disconnect", user)
    clients.remove(clients?.get(socket))
}

const handleLogin = async (socket: Socket, data: LoginForm) => {
    try {
        const user = await prisma.login(data)
        if (user) {
            socket.emit("user:login:success", user)
        } else {
            socket.emit("user:login:failed", { error: "Invalid login credentials" })
        }
    } catch (error: any) {
        socket.emit("user:login:failed", { error: error.message })
    }
}

const newUser = async (socket: Socket, userNew: any) => {
    try {
        const existingUser = await prisma.exists(userNew)

        if (existingUser) {
            if (existingUser)
                socket.emit("user:status:failed", {
                    error: "Usuário já está aprovado",
                })
        } else {
            const pendingUser = await prisma.newUser(userNew)

            // gambiarra pra rodar redondo no front, coloquei isso pq no front tá esperando receber isso, depois vc arruma
            socket.emit("user:signup:success", pendingUser) // <<<<<<<<<<<<

            socket.emit("user:status:review", pendingUser)
            socket.broadcast.emit("admin:list:update", pendingUser) // coloquei .user aqui pra gambiarrar o broadcast
        }
    } catch (error: any) {
        console.log("OLHA O GRANDE ERRO: ------------", error)
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap: any = {
                username: "O nome de usuário já existe.",
                email: "Este e-mail já está cadastrado",
                cpf: "CPF já cadastrado.",
                rg: "RG já cadastrado.",
                cnpj: "CNPJ já registrado.",
                // voter_card: "Voter card already registered.",
                // work_card: "Work card already exists.",
            }

            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:status:failed", {
                        error: fieldErrorMap[field],
                    })
                    break
                }
            }
        }
    }
}
const newEmployee = async (socket: Socket, userNew: any) => {
    try {
        const existingUser = await prisma.exists(userNew)

        if (existingUser) {
            if (existingUser)
                socket.emit("user:status:failed", {
                    error: "Usuário já está aprovado",
                })
        } else {
            const pendingUser = await prisma.newEmployee(userNew)

            // gambiarra pra rodar redondo no front, coloquei isso pq no front tá esperando receber isso, depois vc arruma
            socket.emit("user:signup:success", pendingUser) // <<<<<<<<<<<<

            socket.emit("user:status:review", pendingUser)
            socket.broadcast.emit("admin:list:update", pendingUser) // coloquei .user aqui pra gambiarrar o broadcast
        }
    } catch (error: any) {
        console.log("OLHA O GRANDE ERRO: ------------", error)
        if (error.code === "P2002" && error.meta) {
            // Mapping field errors to error messages
            const fieldErrorMap: any = {
                username: "O nome de usuário já existe.",
                email: "Este e-mail já está cadastrado",
                cpf: "CPF já cadastrado.",
                rg: "RG já cadastrado.",
                cnpj: "CNPJ já registrado.",
                // voter_card: "Voter card already registered.",
                // work_card: "Work card already exists.",
            }

            for (const field in fieldErrorMap) {
                if (error.meta.target.includes(field)) {
                    socket.emit("user:status:failed", {
                        error: fieldErrorMap[field],
                    })
                    break
                }
            }
        }
    }
}

const approve = async (socket: Socket, id: number) => {
    try {
        const user = await prisma.approve(id)
        socket.emit("application:status:approved", user)
    } catch (error: any) {
        socket.emit("application:approval:error", { error: error.message })
        console.log(error)
    }
}

const reject = async (socket: Socket, id: number) => {
    try {
        const user = await prisma.reject(id)
        socket.emit("application:status:rejected", user)
    } catch (error: any) {
        socket.emit("application:rejection:error", { error: error.message })
        console.log(error)
    }
}

const listPendingApproval = async (socket: Socket) => {
    try {
        const users = await prisma.pendingList()
        socket.emit("user:pendingApprovalList:success", users)
    } catch (error) {
        console.error(`Error fetching users pending admin approval`)
        socket.emit("user:pendingApprovalList:error", { error })
    }
}

const listUsersApproved = async (socket: Socket) => {
    try {
        const users = await prisma.approvedList()
        socket.emit("users:list:success", users)
    } catch (error) {
        console.error("Erro para acessar lista de usuários")
        socket.emit("users:list:error", { error })
    }
}

const findUser = async (socket: Socket, id: number) => {
    try {
        const user = await prisma.findById(id)
        socket.emit("user:find:success", user)
    } catch (error) {
        console.error(`Error fetching user for ID: ${id}. Error: ${error}`)
        socket.emit("user:find:error", { error: error })
    }
}

const updateUser = async (socket: Socket, data: any) => {
    console.log(data)
    try {
        const updatedUser = await prisma.update(data)
        socket.emit("user:update:success", updatedUser)
    } catch (error) {
        console.log(error)
        socket.emit("user:update:failed", { error: error })
    }
}

const toggleAdmin = async (socket: Socket, data: User) => {
    try {
        const user = await prisma.toggleAdmin(data.id)
        socket.emit("user:admin:toggle:success", user)
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Id não encontrado"
        socket.emit("user:admin:toggle:failed", { error: message })
        console.log(message)
    }
}

const toggleManager = async (socket: Socket, data: User) => {
    try {
        const user = await prisma.toggleManager(data.id)
        socket.emit("user:manager:toggle:success", user)
    } catch (error: any) {
        let message = error
        if (error.code === "P2025") message = "Id não encontrado"
        socket.emit("user:manager:toggle:failed", { error: message })
        console.log(message)
    }
}

export default {
    logout,
    newUser,
    newEmployee,
    reject,
    approve,
    handleLogin,
    findUser,
    updateUser,
    listUsersApproved,
    listPendingApproval,
    toggleAdmin,
    toggleManager,
}
