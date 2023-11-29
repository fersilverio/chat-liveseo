import { ref } from 'vue'
import io from "socket.io-client";

export const socket = io("http://localhost:3000");
export const socketId = ref("");
//export const userName = ref("");
export const messageList = ref([]);

socket.on("connect", () => {
    socketId.value = socket.id;
    console.log("Client::: socket connected", socketId.value);
})

// socket.on("nameInserted", (name) => {
//     userName.value = name;
// })


socket.on("sendUpdatedMessageList", (messages) => {
    messageList.value = messages;
})

export const sendNewMessage = (newMessage) => {
    socket.emit("sendMessage", newMessage);
}