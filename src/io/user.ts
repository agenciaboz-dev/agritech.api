import { Socket } from "socket.io";
import { User, Employee } from "@prisma/client";
import { getIoInstance, handleSocket } from "./socket";
import databaseHandler from "../databaseHandler";
import { ClientBag } from "../definitions/client";
import { LoginForm, NewUser } from "../definitions/newUser";
import { normalize } from "path";

interface UpdateUser extends Omit<User, "id"> {
  id: number;
}

const prisma = databaseHandler;

const logout = async (socket: Socket, clients: ClientBag, user: User) => {
  const io = getIoInstance();

  io.emit("user:disconnect", user);
  clients.remove(clients?.get(socket));
};

const handleLogin = async (socket: Socket, data: LoginForm) => {
  const user = await databaseHandler.user.login(data);

  if (user) {
    socket.emit("user:login:success", user);
  } else {
    // If the login fails, emit a "user:login:failed" event with an error message.
    socket.emit("user:login:failed", { error: "Credenciais inválidas." });
  }
};

const newUser = async (
  socket: Socket,
  userNew: any // Change 'any' to 'NewUser' to ensure type safety
) => {
  try {
    // Check if a user with the same data already exists
    const existingUser = await prisma.user.exists(userNew);

    if (existingUser) {
      // User with the same data already exists
      socket.emit("application:status:failed", {
        error: "Usuário já está aprovado",
      });
    } else {
      // No user with the same data found, proceed with user creation
      const pendingUser = await prisma.user.new(userNew);

      // Emit success event
      socket.emit("application:status:review", pendingUser);
      socket.broadcast.emit("admin:list:update", pendingUser);
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapping field errors to error messages
      const fieldErrorMap: any = {
        username: "The username already exists.",
        email: "The email already exists.",
        cpf: "CPF already registered.",
        rg: "RG already registered.",
        cnpj: "CNPJ already registered.",
        voter_card: "Voter card already registered.",
        work_card: "Work card already exists.",
      };

      // Check which field caused the error
      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("application:status:failed", {
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
    const user = await prisma.user.approve(id);
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
    const user = await prisma.user.reject(id);
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
  console.log("List of users pending approval");
  try {
    const user = await prisma.user.list();
    if (user) {
      socket.emit("user:pendingApprovalList:success", user);
    }
  } catch (error) {
    console.error(`Error fetching users pending admin approval`);
    socket.emit("user:pendingApprovalList:error", { error });
  }
};

const findUser = async (socket: Socket, data: { userId: number }) => {
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
  }
};

const updateUser = async (socket: Socket, updateUser: any) => {
  console.log("Usuário atualizado:", updateUser);

  try {
    const user = await prisma.user.update(updateUser);

    if (user) {
      socket.emit("user:update:success", user);
      socket.broadcast.emit("user:update:success", user);
    } else {
      socket.emit("user:update:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("user:update:failed", { error: error });
  }
};

export default {
  logout,
  newUser,
  reject,
  approve,
  handleLogin,
  findUser,
  updateUser,
  listPendingApproval,
  // listUser,
};
