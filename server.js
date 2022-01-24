import { match } from 'assert';
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import createGame from './public/game.js';

const app = express();
const server = http.createServer(app);
const soket = new Server(server); 
const porta = process.env.PORT;

app.use(express.static('public'));

const game = createGame();



soket.on('connection',(item)=>{
    console.log("Jogador: "+item.id+' conectado');
    const playerId = item.id;
    item.emit('states',game.states)
   
    game.addPlayer({playerId:playerId});

    game.subscribe((command)=>{
        soket.emit(command.type,command);
    });

    
    item.on('disconnect',(desc)=>{
        console.log(`Jogador: ${item.id} DESCONECTED`);
        game.removerPlayer({playerId:playerId});
    })
    item.on('move-player',(command)=>{
        game.movePlayer(command)
        soket.emit('mover-player',command)
    })
   

});

   


server.listen(porta || 3000);