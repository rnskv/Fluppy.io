import io from 'socket.io-client';
import EventEmitter from './EventEmitter';

const socket = io.connect('http://localhost:3000');

//test
const joinButton = document.querySelector("#join");
const leaveButton = document.querySelector("#leave");

joinButton.onclick = () => socket.emit('game:join');
leaveButton.onclick = () => socket.emit('game:leave');

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