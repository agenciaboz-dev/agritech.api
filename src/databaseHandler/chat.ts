import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const create = async (userId1: number, userId2: number) => {
  console.log("Iniciando a criação da sala de chat...");

  console.log("User IDs:", userId1, userId2); // Debugging log

  const chatRoom = await prisma.chat.create({
    data: {
      users: {
        connect: [{ id: userId1 }, { id: userId2 }],
      },
    },
  });

  console.log({ chatRoom });
  console.log("Sala de chat criada:", chatRoom);
  return chatRoom;
};

export default {
  create,
};
