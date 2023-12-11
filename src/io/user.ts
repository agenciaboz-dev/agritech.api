import { Socket } from "socket.io";
import { User, Employee } from "@prisma/client";
import databaseHandler from "../databaseHandler";
import { LoginForm, NewUser } from "../definitions/newUser";
import { join } from "path";

interface UpdateUser extends Omit<User, "id"> {
  id: number;
}

const prisma = databaseHandler;

const handleLogin = async (socket: Socket, data: LoginForm) => {
  const user = await databaseHandler.user.login(data);

  if (user) {
    socket.emit("user:login:success", user);
  } else {
    // If the login fails, emit a "user:login:failed" event with an error message.
    socket.emit("user:login:failed", { error: "Credenciais inválidas." });
  }
};

const newUser = async (socket: Socket, data: any) => {
  try {
    const pendingUser = await prisma.user.newUser(data);

    // gambiarra pra rodar redondo no front, coloquei isso pq no front tá esperando receber isso, depois vc arruma
    socket.emit("user:signup:success", pendingUser); // <<<<<<<<<<<<

    socket.emit("user:status:review", pendingUser);
    socket.broadcast.emit("admin:list:update", pendingUser.user); // coloquei .user aqui pra gambiarrar o broadcast
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
        }
      }
    }
  }
};

const approve = async (socket: Socket, id: number) => {
  try {
    const user = await databaseHandler.user.approve(id);
    if (user) {
      socket.emit("application:status:approved", user);
    } else {
      socket.emit("application:aproval:error", {
        error: "Approval Error",
      });
    }
    // Notify the user that their application is approved
  } catch (error: any) {
    console.log(error);
  }
};

const reject = async (socket: Socket, id: number) => {
  try {
    const user = await databaseHandler.user.reject(id);
    if (user) {
      socket.emit("application:status:rejected", user);
    } else {
      socket.emit("application:rejection:error", {
        error: "Erro Rejected",
      });
    }
  } catch (error: any) {
    console.log(error);
  }
};

const listPendingApproval = async (socket: Socket) => {
  // console.log("List of users pending approval")
  try {
    const users = await databaseHandler.user.pendingList();
    if (users) {
      socket.emit("user:pendingApprovalList:success", users);
    }
  } catch (error) {
    console.error(`Error fetching users pending admin approval`);
    socket.emit("user:pendingApprovalList:error", { error });
  }
};

const listUsersApproved = async (socket: Socket) => {
  // console.log("Lista de aprovados")
  try {
    const users = await databaseHandler.user.approvedList();
    if (users) {
      socket.emit("users:list:success", users);
    }
  } catch (error) {
    console.error("Erro para acessar lista de usuários");
    socket.emit("users:list:error", { error });
  }
};

const findUser = async (socket: Socket, data: { userId: number }) => {
  const userId = data.userId;
  try {
    const userDetails = await databaseHandler.user.(userId);
    console.log(userDetails);
    if (userDetails) {
      socket.emit("user:find:success", userDetails);
    } else {
      socket.emit("user:find:failed", { error: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error(`Error fetching user for ID: ${userId}. Error: ${error}`);
    socket.emit("user:find:error", { error: error });
  }
};

const updateUser = async (socket: Socket, updateUser: any) => {
  console.log("Usuário atualizado:", updateUser);

  try {
    const user = await prisma.user.update(updateUser);

    if (user) {
      socket.emit("user:update:success", user);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("user:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("user:update:failed", { error: error });
  }
};

export default {
  newUser,
  reject,
  approve,
  handleLogin,
  findUser,
  updateUser,
  listUsersApproved,
  listPendingApproval,
};
