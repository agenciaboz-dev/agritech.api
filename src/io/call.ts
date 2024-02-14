import { Socket } from "socket.io";
import databaseHandler from "../databaseHandler/call";
import tillage from "../databaseHandler/tillage";
import { Call } from "@prisma/client";
import { ApproveCall, OpenCall } from "../definitions/call";

const newAdminCall = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const call = await databaseHandler.adminCreate(data);
    const tillageUpdate = await tillage.list();
    socket.emit("adminCall:creation:success", call);
  } catch (error) {
    console.log(error);
    socket.emit("adminCall:creation:failed", { error: error });
  }
};

const newCall = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const call = await databaseHandler.create(data);
    socket.emit("call:creation:success", call);
  } catch (error) {
    console.log(error);
    socket.emit("call:creation:failed", { error: error });
  }
};

const updateCall = async (socket: Socket, data: any) => {
  console.log(data);

  try {
    const call = await databaseHandler.update(data);
    socket.emit("call:update:success", call);
  } catch (error) {
    console.log(error);
    socket.emit("call:update:failed", { error: error });
  }
};

const approveCall = async (socket: Socket, data: ApproveCall) => {
  console.log(data);

  try {
    const call = await databaseHandler.approve(data);
    socket.emit("call:approve:success", call);
    socket.emit("stage:creation:success", call.stage);
  } catch (error) {
    console.log(error);
    socket.emit("call:approve:failed", { error: error });
  }
};

const closeCall = async (socket: Socket, data: Call) => {
  console.log(data);

  try {
    const call = await databaseHandler.close(data);
    socket.emit("call:close:success", call);
  } catch (error) {
    console.error(error);
    socket.emit("call:close:failed", { error: error });
  }
};

const cancelCall = async (socket: Socket, data: Call) => {
  console.log(data);

  try {
    const call = await databaseHandler.cancel(data);
    socket.emit("call:cancel:success", call);
    // socket.emit("report:creation:success", report)
  } catch (error) {
    console.log(error);
    socket.emit("call:cancel:failed", { error: error });
    // socket.emit("report:creation:failed", { error: error })
  }
};

const listCall = async (socket: Socket) => {
  const call = await databaseHandler.list();
  socket.emit("call:list:success", call);
};
const listCallPending = async (socket: Socket) => {
  const call = await databaseHandler.listPending();
  socket.emit("call:listPending:success", call);
};
const listCallApproved = async (socket: Socket) => {
  const call = await databaseHandler.listApproved();
  socket.emit("call:listApproved:success", call);
};

export default {
  newCall,
  newAdminCall,
  updateCall,
  approveCall,
  closeCall,
  cancelCall,
  listCall,
  listCallPending,
  listCallApproved,
};
