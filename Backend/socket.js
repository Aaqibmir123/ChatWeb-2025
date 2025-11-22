import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinGroup", (groupId) => {
      socket.join(groupId);
      console.log(`User ${socket.id} joined ${groupId}`);
    });

    socket.on("groupMessage", ({ groupId, message, senderId }) => {
      console.log("MESSAGE RECEIVED:", message);
      io.to(groupId).emit("newGroupMessage", {
        groupId,
        message,
        senderId,
        createdAt: new Date(),
      });
    });

    socket.on("leaveGroup", (groupId) => {
      socket.leave(groupId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export { io };
