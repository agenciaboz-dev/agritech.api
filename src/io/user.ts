<<<<<<< HEAD
import { Socket } from "socket.io";
import { User, Employee } from "@prisma/client";
import { getIoInstance, handleSocket } from "./socket";
import databaseHandler from "../databaseHandler";
import { ClientBag } from "../definitions/client";
import { LoginForm, NewUser } from "../definitions/newUser";
<<<<<<< HEAD
import { join } from "path";
=======
import { Socket } from "socket.io"
import { User, Employee } from "@prisma/client"
import { getIoInstance, handleSocket } from "./socket"
import databaseHandler from "../databaseHandler"
import { ClientBag } from "../definitions/client"
import { LoginForm, NewUser } from "../definitions/newUser"
import { normalize } from "path"
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
=======
import { normalize } from "path";
>>>>>>> parent of 1378fea (fixes to user lists)

interface UpdateUser extends Omit<User, "id"> {
    id: number
}

const prisma = databaseHandler

<<<<<<< HEAD
<<<<<<< HEAD
=======
const logout = async (socket: Socket, clients: ClientBag, user: User) => {
    const io = getIoInstance()

    io.emit("user:disconnect", user)
    clients.remove(clients?.get(socket))
}

>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
=======
const logout = async (socket: Socket, clients: ClientBag, user: User) => {
  const io = getIoInstance();

  io.emit("user:disconnect", user);
  clients.remove(clients?.get(socket));
};

>>>>>>> parent of 1378fea (fixes to user lists)
const handleLogin = async (socket: Socket, data: LoginForm) => {
    const user = await databaseHandler.user.login(data)

    if (user) {
        socket.emit("user:login:success", user)
    } else {
        // If the login fails, emit a "user:login:failed" event with an error message.
        socket.emit("user:login:failed", { error: "Credenciais inválidas." })
    }
}

<<<<<<< HEAD
<<<<<<< HEAD
const newUser = async (socket: Socket, data: any) => {
=======
const newUser = async (socket: Socket, userNew: any) => {
>>>>>>> parent of 1378fea (fixes to user lists)
  try {
    const existingUser = await prisma.user.exists(userNew);

    if (existingUser) {
      if (existingUser)
        socket.emit("user:status:failed", {
          error: "Usuário já está aprovado",
        });
    } else {
      const pendingUser = await prisma.user.new(userNew);

      // gambiarra pra rodar redondo no front, coloquei isso pq no front tá esperando receber isso, depois vc arruma
      socket.emit("user:signup:success", pendingUser); // <<<<<<<<<<<<

      socket.emit("user:status:review", pendingUser);
      socket.broadcast.emit("admin:list:update", pendingUser.user); // coloquei .user aqui pra gambiarrar o broadcast
    }
  } catch (error: any) {
    console.log("OLHA O GRANDE ERRO: ------------", error);
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
      };

      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("user:status:failed", {
            error: fieldErrorMap[field],
          });
          break;
=======
const newUser = async (socket: Socket, userNew: any) => {
    try {
        const existingUser = await prisma.user.exists(userNew)

        if (existingUser) {
            if (existingUser)
                socket.emit("user:status:failed", {
                    error: "Usuário já está aprovado",
                })
        } else {
            const pendingUser = await prisma.user.new(userNew)

            // gambiarra pra rodar redondo no front, coloquei isso pq no front tá esperando receber isso, depois vc arruma
            socket.emit("user:signup:success", pendingUser) // <<<<<<<<<<<<

            socket.emit("user:status:review", pendingUser)
            socket.broadcast.emit("admin:list:update", pendingUser.user) // coloquei .user aqui pra gambiarrar o broadcast
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
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
        }
    }
}

const approve = async (socket: Socket, id: number) => {
<<<<<<< HEAD
  try {
    const user = await prisma.user.approve(id);
    if (user) {
      socket.emit("application:status:approved", user);
    } else {
      socket.emit("application:aproval:error", {
        error: "Approval Error",
      });
=======
    try {
        const user = await prisma.user.approve(id)
        if (user) {
            socket.emit("application:status:approved", user)
        } else {
            socket.emit("application:aproval:error", {
                error: "Approval Error",
            })
        }
        // Notify the user that their application is approved
    } catch (error: any) {
        console.log(error)
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
    }
}

const reject = async (socket: Socket, id: number) => {
<<<<<<< HEAD
  try {
    const user = await prisma.user.reject(id);
    if (user) {
      socket.emit("application:status:rejected", user);
    } else {
      socket.emit("application:rejection:error", {
        error: "Erro Rejected",
      });
=======
    try {
        const user = await prisma.user.reject(id)
        if (user) {
            socket.emit("application:status:rejected", user)
        } else {
            socket.emit("application:rejection:error", {
                error: "Erro Rejected",
            })
        }
    } catch (error: any) {
        console.log(error)
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
    }
}

const listPendingApproval = async (socket: Socket) => {
<<<<<<< HEAD
  // console.log("List of users pending approval")
  try {
    const users = await prisma.user.pendingList();
    if (users) {
      socket.emit("user:pendingApprovalList:success", users);
=======
    // console.log("List of users pending approval")
    try {
        const users = await prisma.user.pendingList()
        if (users) {
            socket.emit("user:pendingApprovalList:success", users)
        }
    } catch (error) {
        console.error(`Error fetching users pending admin approval`)
        socket.emit("user:pendingApprovalList:error", { error })
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
    }
}

const listUsersApproved = async (socket: Socket) => {
<<<<<<< HEAD
  // console.log("Lista de aprovados")
  try {
    const users = await prisma.user.approvedList();
    if (users) {
      socket.emit("users:list:success", users);
=======
    // console.log("Lista de aprovados")
    try {
        const users = await prisma.user.approvedList()
        if (users) {
            socket.emit("users:list:success", users)
        }
    } catch (error) {
        console.error("Erro para acessar lista de usuários")
        socket.emit("users:list:error", { error })
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
    }
}

const findUser = async (socket: Socket, data: { userId: number }) => {
<<<<<<< HEAD
  const userId = data.userId;
  try {
    const userDetails = await prisma.user.find.byId(userId);
    console.log(userDetails);
    if (userDetails) {
      socket.emit("user:find:success", userDetails);
    } else {
      socket.emit("user:find:failed", { error: "Usuário não encontrado." });
=======
    const userId = data.userId
    try {
        const userDetails = await prisma.user.find.byId(userId)
        console.log(userDetails)
        if (userDetails) {
            socket.emit("user:find:success", userDetails)
        } else {
            socket.emit("user:find:failed", { error: "Usuário não encontrado." })
        }
    } catch (error) {
        console.error(`Error fetching user for ID: ${userId}. Error: ${error}`)
        socket.emit("user:find:error", { error: error })
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
    }
}

const updateUser = async (socket: Socket, updateUser: any) => {
    console.log("Usuário atualizado:", updateUser)

    try {
        const user = await prisma.user.update(updateUser)

        if (user) {
            socket.emit("user:update:success", user)
            // socket.broadcast.emit("user:update", user)
        } else {
            socket.emit("user:update:failed")
        }
    } catch (error) {
        console.log(error)
        socket.emit("user:update:failed", { error: error })
    }
}

export default {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  logout,
>>>>>>> parent of 1378fea (fixes to user lists)
  newUser,
  reject,
  approve,
  handleLogin,
  findUser,
  updateUser,
  listUsersApproved,
  listPendingApproval,
  // istUser,
};
=======
    logout,
    newUser,
    reject,
    approve,
    handleLogin,
    findUser,
    updateUser,
    listUsersApproved,
    listPendingApproval,
    // istUser,
}
>>>>>>> parent of 18b04b1 (refatoração databaseHandler)
