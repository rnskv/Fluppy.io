//Этот файл надо нахуй переписать

import io from "socket.io-client";
import EventEmitter from "shared/core/EventEmitter";
import globalConfig from "shared/configs/servers";

const socket = io.connect(`${globalConfig.urls.server.url()}`);

//test
const joinButton = document.querySelector("#join");
const leaveButton = document.querySelector("#leave");

const checkInterpolateButton = document.querySelector("#interpolate");
//
// joinButton.onclick = () => socket.emit('game:join');
// leaveButton.onclick = () => socket.emit('game:leave');
// checkInterpolateButton.onchange = (e) => window.game.updateSettings({interpolate: e.target.checked});

document.addEventListener("click", e => {
  socket.emit("game:player:click", e);
});

document.addEventListener("touchstart", e => {
  socket.emit("game:player:click", e);
});

document.addEventListener("keypress", e => {
  if (e.keyCode === 32) {
    socket.emit("game:player:click", e);
  }
});

EventEmitter.subscribe("game:join", playerData => {
  socket.emit("game:join", playerData);
});

EventEmitter.subscribe("game:leave", () => {
  socket.emit("game:leave");
});

socket.on("connect", () => {
  socket.on("game:update", data => {
    console.log(data)
    EventEmitter.emit("server:updates", data);
  });

  socket.on("game:player:join", data => {
    EventEmitter.emit("game:player:join", data);
  });

  socket.on("game:player:leave", data => {
    EventEmitter.emit("game:player:leave", data);
  });

  socket.on("me:init", data => {
    EventEmitter.emit("me:init", data);
  });
});
