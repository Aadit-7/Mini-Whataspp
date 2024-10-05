import { Server } from "socket.io";
import http from "http"; // We can't make two servers on the same port, so we use this http module to merge the Express server with the Socket.IO server
import express from "express";

const app = express();

// Combine the Express app with the HTTP server.
// This allows both the web server (Express) and the WebSocket server (Socket.IO) to run on the same port.
const server = http.createServer(app);

// Initialize the Socket.IO server and attach it to the HTTP server.
const io = new Server(server, {
  // Configure CORS to allow cross-origin requests from the frontend at http://localhost:3000.
  // This is required for connectiong the frontend to this server.
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

// function to get the receiver's socket ID from the userSocketMap.
// This is used to send messages directly to a specific user.
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Looks up the receiver's socket ID by their user ID.
};

// A map to store the relationship between userId and socketId.
// It helps to track which user is connected to which socket for messaging purposes.
// Example: { userId: "socketId" }
const userSocketMap = {};

// Listen for a new connection from a client.
io.on("connection", (socket) => {
  // Retrieve the userId from the query parameters sent by the client during connection.
  const userId = socket.handshake.query.userId;

  // Here we store the userId which was provided by client in the userSocketMap
  // to associate this user with their socket ID.
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id;
  }

  // Broadcast the list of online users (the keys of userSocketMap) to all connected clients.
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Listen for the disconnect event when the user disconnects from the server.
  socket.on("disconnect", () => {
    // Remove the user from the userSocketMap since they are no longer connected.
    delete userSocketMap[userId];

    // Broadcast the updated list of online users after the user has disconnected.
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
