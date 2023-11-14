import { Socket } from "socket.io";
import { getIoInstance, handleSocket } from "./socket";
import databaseHandler from "../databaseHandler";
import { ClientBag } from "../definitions/client";
import { LoginForm, NewUser } from "../definitions/newUser";
import { normalize } from "path";

const prisma = databaseHandler;

const userNew = async (
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
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapping field errors to error messages
      const fieldErrorMap: any = {
        username: "O nome de usuário já existe.",
        email: "O e-mail já existe.",
        cpf: "CPF já cadastrado.",
        rg: "RG já cadastrado.",
        cnpj: "CNPJ já cadastrado.",
        voter_card: "Título de Eleitor já cadastrado.",
        work_card: "Carteira de trabalho já existe.",
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

export default {
  userNew,
  approve,
  reject,
};
