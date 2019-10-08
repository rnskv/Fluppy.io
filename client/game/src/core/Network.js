//Этот файл надо нахуй переписать

import io from 'socket.io-client';
import EventEmitter from './EventEmitter';

const socket = io.connect('http://192.168.0.13:3000');

//test
const joinButton = document.querySelector("#join");
const leaveButton = document.querySelector("#leave");

const checkInterpolateButton = document.querySelector("#interpolate");

joinButton.onclick = () => socket.emit('game:join');
leaveButton.onclick = () => socket.emit('game:leave');
checkInterpolateButton.onchange = (e) => window.game.updateSettings({interpolate: e.target.checked});

document.addEventListener('click', (e) => {
    socket.emit('game:player:click', e);
});

document.addEventListener('touchstart', (e) => {
    socket.emit('game:player:click', e);
});

document.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        socket.emit('game:player:click', e);
    }
});



socket.on('connect', () => {
    socket.on('game:update', data => {
        EventEmitter.emit('server:updates', data);
    });

    socket.on('game:player:join', data => {
        EventEmitter.emit('game:player:join', data)
    });

    socket.on('game:player:leave', data => {
        EventEmitter.emit('game:player:leave', data)
    });

    socket.on('me:init', data => {
        EventEmitter.emit('me:init', data);
    });
});
