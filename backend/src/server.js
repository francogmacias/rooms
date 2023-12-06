import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
app.get("/", (req, res) => {
    res.send("<h1>Hello world</h1>");
});
io.on("connection", (socket) => {
    socket.onAny((event, args) => {
        console.log("-------------------------------------------------------");
        console.log(`[GLOBAL LOG]: from ${socket.id} event "${event}"`);
        console.log("Arguments: ", args);
        console.log("Current rooms: ", socket.rooms);
    });
    socket.on("joinRoom", (room) => {
        socket.join(room);
    });
    socket.on("leaveRoom", (room) => {
        socket.leave(room);
    });
    socket.on("sendMessage", (message) => {
        socket.broadcast.to(message.room).emit("receiveMessage", {
            from: message.from,
            content: message.content,
        });
    });
    socket.on("disconnecting", () => { });
    socket.on("disconnect", () => { });
});
server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
