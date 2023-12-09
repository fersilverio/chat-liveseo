<script setup>
import { ref } from "vue";

import * as dayjs from "dayjs";
import { sendNewMessage, socketId, messageList, joinRoom } from "../websocket";

const newMessage = ref("");

const defined = ref(false);
const name = ref("");

const avaliableRooms = ["Sala 1", "Sala 2", "Sala 3", "Sala 4", "Sala 5"];

const defineName = (userName) => {
  name.value = userName;
  defined.value = !defined.value;
};

const sendMessage = (msg) => {
  sendNewMessage({
    content: msg,
    socketId: socketId.value,
    dateTime: new Date(),
    user: name.value,
  });

  newMessage.value = "";
};
</script>

<template>
  <main style="">
    <div v-if="defined" class="container">
      <div class="row">
        <div class="col-sm-2">
          <ul
            style="list-style-type: none"
            v-for="(room, index) in avaliableRooms"
            :key="index"
          >
            <li class="btn btn-primary" @click="joinRoom(room)">{{ room }}</li>
          </ul>
        </div>
        <div class="col-sm-10">
          <div
            class="container"
            style="
              display: flex;
              flex-direction: column;
              align-content: flex-start;
            "
          >
            <h1>Chat da galera</h1>
            <div
              class="container"
              style="
                border: rgba(220, 218, 218, 0.364) 4px solid;
                height: 800px;
                max-height: 800px;
                overflow-y: auto;
                border-radius: 1%;
              "
            >
              <div
                v-for="(message, index) in messageList"
                :key="index"
                style="margin: 15px"
              >
                <div class="container">
                  <div
                    class="card"
                    style="
                      border: rgb(209, 206, 206) 1px solid;
                      box-shadow: 1px gray;
                    "
                  >
                    <div class="card-body">
                      <h5 class="card-title">{{ message.user }}</h5>
                      <p class="card-subtitle mb-2 text-muted">
                        {{ dayjs(message.dateTime).format("DD/MM/YYYY HH:mm") }}
                      </p>
                      <p class="card-text">{{ message.content }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row"
              style="
                margin-top: 10px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
              "
            >
              <div class="col">
                <input
                  @keyup.enter="sendMessage(newMessage)"
                  class="form-control"
                  type="text"
                  v-model="newMessage"
                  placeholder="Insira a mensagem..."
                />
              </div>
              <div class="col">
                <button
                  class="btn btn-primary"
                  @click="sendMessage(newMessage)"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container" style="width: 500px; margin-top: 100px">
        <input
          v-model="userName"
          class="form-control"
          type="text"
          placeholder="Insira seu nome..."
        />
        <br />
        <button @click="defineName(userName)" class="btn btn-primary">
          Iniciar chat
        </button>
      </div>
    </div>
  </main>
</template>

<style>
::-webkit-scrollbar {
  width: 3px;
  /* Largura do scrollbar */
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* Cor de fundo do track (caminho do scrollbar) */
}

::-webkit-scrollbar-thumb {
  background: #888;
  /* Cor do thumb (o "botão" do scrollbar) */
  border-radius: 4px;
  /* Borda arredondada */
}
</style>
