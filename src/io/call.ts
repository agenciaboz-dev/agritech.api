import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler";
import { Call } from "@prisma/client";
import { CloseCall } from "../definitions/call";

const newCall = async (socket: Socket, data: any) => {
  console.log("Novo Chamado:", data);

  try {
    const call = await databaseHandler.call.create(data);

    if (call) {
      socket.emit("call:creation:success", call);
      // socket.broadcast.emit("user:update", user)
    } else {
      socket.emit("call:creation:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:update:failed", { error: error });
  }
};

// const updateCoordinate = async (socket: Socket, data: any) => {
//   console.log("Coordenada atualizada:", data);

//   try {
//     const coordinate = await databaseHandler.coordinate.update(data);

//     if (coordinate) {
//       socket.emit("coordinate:update:success", coordinate);
//       // socket.broadcast.emit("user:update", user)
//     } else {
//       socket.emit("coordinate:update:failed");
//     }
//   } catch (error) {
//     console.log(error);
//     socket.emit("coordinate:update:failed", { error: error });
//   }
// };

const approveCall = async (socket: Socket, data: Call) => {
  console.log("Chamado Aprovado:", data);

  try {
    const call = await databaseHandler.call.approve(data);

    if (call) {
      socket.emit("call:approve:success", call);
    } else {
      socket.emit("call:approve:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:approve:failed", { error: error });
  }
};

const closeCall = async (socket: Socket, data: Call) => {
  console.log("Chamado Fechado:", data);

  try {
    const call = await databaseHandler.call.close(data);

    if (call) {
      socket.emit("call:close:success", call);
    } else {
      socket.emit("call:close:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:close:failed", { error: error });
  }
};

const cancelCall = async (socket: Socket, data: Call) => {
  console.log("Chamado Cancelado:", data);

  try {
    const call = await databaseHandler.call.cancel(data);

    if (call) {
      socket.emit("call:cancel:success", call);
    } else {
      socket.emit("call:cancel:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:cancel:failed", { error: error });
  }
};

const listCall = async (socket: Socket) => {
  console.log("Lista de Chamados");
  const call = await databaseHandler.call.list();
  socket.emit("call:list:success", call);
};

export default {
  newCall,
  //   updateCoordinate,
  approveCall,
  closeCall,
  cancelCall,
  listCall,
};
