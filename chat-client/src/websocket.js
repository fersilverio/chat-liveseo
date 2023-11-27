import { ref } from 'vue'
import io from "socket.io-client";

export const socket = io("http://localhost:3000");
export const socketId = ref("");
export const messageList = ref([]);
socket.on("connect", () => {
    socketId.value = socket.id;
    console.log("Client::: socket connected", socketId.value);
})


socket.on("sendUpdatedMessageList", (messages) => {
    console.log(3, messages)
    messageList.value = messages;
    console.log(messageList.value);
})

export const sendNewMessage = (newMessage) => {
    console.log(1, newMessage);
    socket.emit("sendMessage", newMessage);
}