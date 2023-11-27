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

    socket.on("sendMessage", (message) => {
        console.log(2)
        messages.push(message);
        console.log("messages:::", messages);
        io.emit("sendUpdatedMessageList", messages);
    })
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});