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
    });

    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log("-------------------------------------------------------");
        console.log(`[${socket.id}] joined to room: `, room);
        console.log(`[${socket.id}] rooms: `, socket.rooms);
    });

    socket.on("leaveRoom", (room) => {
        socket.leave(room);
        console.log("-------------------------------------------------------");
        console.log(`[${socket.id}] left to room: `, room);
        console.log(`[${socket.id}] rooms: `, socket.rooms);
    });

    socket.on("sendMessage", (message: Message) => {
        console.log("-------------------------------------------------------");
        console.log("(", message.from, "): ", message.content);
        console.log("to room: ", message.room);
        console.log(`[${socket.id}] rooms: `, socket.rooms);
        socket.broadcast.to(message.room).emit("receiveMessage", {
            from: message.from,
            content: message.content,
        });
    });

    socket.on("disconnecting", () => {
        console.log("-------------------------------------------------------");
        console.log(`[${socket.id}] disconnecting`);
        console.log(`[${socket.id}] rooms: `, socket.rooms);
    });

    socket.on("disconnect", () => {
        console.log("-------------------------------------------------------");
        console.log(`[${socket.id}] disconnected`);
        console.log(`[${socket.id}] rooms: `, socket.rooms);
    });
});

server.listen(3000, () => {
    console.log("server running at http://localhost:3000");
});
