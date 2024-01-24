import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/call";
import { Call } from "@prisma/client";
import { OpenCall } from "../definitions/call";

const newCall = async (socket: Socket, data: any) => {
  console.log("Novo Chamado:", data);

  try {
    const call = await databaseHandler.create(data);

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

const approveCall = async (socket: Socket, data: Call) => {
  console.log("Chamado Aprovado:", data);

  try {
    const call = await databaseHandler.approve(data);

    if (call) {
      socket.emit("call:approve:success", call.call);
      socket.emit("stage:creation:success", call.stage);
    } else {
      socket.emit("call:approve:failed");
    }
  } catch (error) {
    console.log(error);
    socket.emit("call:approve:failed", { error: error });
  }
};

const closeCall = async (socket: Socket, data: Call) => {
  console.log("Closing Call:", data);

  try {
    const call = await databaseHandler.close(data);

    console.log("Call Closed:", call);

    if (call) {
      socket.emit("call:close:success", call);
      socket.emit("report:creation:success", call.report);
    } else {
      socket.emit("call:close:failed");
    }
  } catch (error) {
    console.error("Error in closeCall:", error);
    socket.emit("call:close:failed", { error: error });
    socket.emit("report:creation:failed", { error: error });
  }
};

const cancelCall = async (socket: Socket, data: Call) => {
  console.log("Chamado Cancelado:", data);

  try {
    const call = await databaseHandler.cancel(data);

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
  // console.log("Lista de Chamados")
  const call = await databaseHandler.list();
  socket.emit("call:list:success", call);
};
const listCallPending = async (socket: Socket) => {
  // console.log("Lista de Chamados Pendentes")
  const call = await databaseHandler.listPending();
  socket.emit("call:listPending:success", call);
};
const listCallApproved = async (socket: Socket) => {
  // console.log("Lista de Chamados Aprovados")
  const call = await databaseHandler.listApproved();
  socket.emit("call:listApproved:success", call);
};

export default {
  newCall,
  //   updateCoordinate,
  approveCall,
  closeCall,
  cancelCall,
  listCall,
  listCallPending,
  listCallApproved,
};
