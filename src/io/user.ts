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
    if (user.isAdmin) {
        // If the user is an admin, perform admin-specific actions.
        // For example, you can emit an "admin:login:success" event.
        socket.emit("admin:login:success", user)
    } else {
        // If the user is not an admin, emit a "user:login:success" event with user details.
        socket.emit("user:login:success", user)
    }
  } else {
    // If the login fails, emit a "user:login:failed" event with an error message.
    socket.emit("user:login:failed", { error: "Credenciais inválidas." });
  }
};

const newUser = async (socket: Socket, newUser: any) => {
  console.log(newUser);

  try {
    const user = await prisma.user.new(newUser);

    if (user) {
      socket.emit("user:signup:success", user);
      socket.broadcast.emit("user:new", user);
    } else {
      socket.emit("user:signup:failed");
    }
  } catch (error: any) {
    console.log(error);
    if (error.code === "P2002" && error.meta) {
      // Mapeamento de campos para mensagens de erro
      const fieldErrorMap: any = {
        username: "O nome de usuário já existe.",
        email: "O e-mail já existe.",
        cpf: "CPF já cadastrado.",
        rg: "RG já cadastrado.",
        cnpj: "CNPJ já cadastrado.",
        voter_card: "Título de Eleitor já cadastrado.",
        work_card: "Carteira de trabalho já existe.",
      };

      // Verifique qual campo causou o erro
      for (const field in fieldErrorMap) {
        if (error.meta.target.includes(field)) {
          socket.emit("user:signup:failed", { error: fieldErrorMap[field] });
          break; // Saia do loop assim que encontrar a correspondência
        }
      }
    }
  }
};

const findUser = async (socket: Socket, data: { userId: number }) => {
  const userId = data.userId;
  console.log(`Received user:find event for user ID: ${userId}`);
  try {
    const userDetails = await prisma.user.find.byId(userId);
    console.log(userDetails);
    if (userDetails) {
      console.log(`Found user details for ID: ${userId}`);
      socket.emit("user:find:success", userDetails);
    } else {
      console.log(`No user found for ID: ${userId}`);
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
  handleLogin,
  findUser,
  updateUser,
  // listUser,
};
