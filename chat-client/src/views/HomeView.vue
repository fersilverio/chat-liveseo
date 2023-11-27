<script setup>
import { ref } from 'vue';
import { sendNewMessage, socketId, messageList } from "../websocket";

const newMessage = ref("");


const sendMessage = (newMessage) => {
  sendNewMessage(newMessage);
  console.log("aaaa", messageList)

}

</script>

<template>
  <main style="margin: 50px;">
    <div class="container" style="display: flex; flex-direction: column; align-content: flex-start;">
      <h1>Chat da galera</h1>
      <div class="container" style="border: black 1px solid;  height: 800px; max-height: 800px; overflow-y: auto;">
        <div v-for="(message, index) in messageList" :key="index">
          <p>{{ socketId }}: {{ message }}</p>
        </div>
      </div>
      <div class="row" style="margin-top: 10px; display: flex; flex-direction: row; justify-content: flex-start;">
        <div class="col">
          <input class="form-control" type="text" v-model="newMessage" placeholder="Insira a mensagem...">
        </div>
        <div class="col">
          <button class="btn btn-primary" @click="sendMessage(newMessage)">Enviar</button>
        </div>
      </div>
    </div>
  </main>
</template>
