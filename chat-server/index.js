import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

export const messages = [];

io.on('connection', (socket) => {
    console.log('a user connected ->', socket.id);

    socket.on("sendMessage", (payload) => {
        console.log("payload", payload);
        messages.push(payload);
        io.emit("sendUpdatedMessageList", messages);
    });

    socket.on("disconnect", () => {
        console.log('a user disconnected ->', socket.id);
    });
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});