export default function createGame(){
    //ESTADO DO JOGO
    const states ={
    players:{},
    fruts:{},
    screen:{with:20,height:20}
}
    const observers=[];
    
    function subscribe(observerFunction){
    observers.push(observerFunction)
}
    function notifyAll(command){

    for(const observerFunction of observers){
        observerFunction(command);
    }
}
    function setState(newState){
        Object.assign(states,newState);
    }
    function addPlayer(command){
      const playerId = command.playerId;
      const x = 'x' in command ? command.x:Math.floor(Math.random() * states.screen.with)
      const y = 'y' in command ? command.y:Math.floor(Math.random() * states.screen.height);
      states.players[playerId]={x:x,y:y}

      notifyAll({
          type:'add-player',
          playerId:playerId,
          x:x,
          y:y
      })
    }
    function removerPlayer(command){
        const Id = command.playerId;
        delete states.players[Id];

        notifyAll({
            type:'remove-player',
            playerId:Id
        })
    }
    function addFrut(command){
      const frutId = command.frutId;
      const x = 'x' in command ? command.x:Math.floor(Math.random() * states.screen.with)
      const y = 'y' in command ? command.y:Math.floor(Math.random() * states.screen.height);
      states.fruts[frutId]={x:x,y:y}
      notifyAll({
        type:'add-Frut',
        frutId:frutId,
        x:x,
        y:y
    })
    }
    function removeFrut(command){
        const Id = command.frutId;
        delete states.fruts[Id];
    }

    //MOVER JOGADOR //CAMADA DE INPUT
    function movePlayer(command){
        notifyAll(command)
       const acceptMoves= {
        ArrowUp(player){
            if(player.y -1  >=0){
           player.y-=1;
        
           return
       }
        },
        ArrowDown(player){
            if(player.y + 1 < states.screen.height){
           player.y+=1;
       
           return
       }
        },
        ArrowLeft(player){
            if(player.x >0){
           player.x-=1;
         
           return
       }
        },
        ArrowRight(player){
            if(player.x + 1 < states.screen.with){
           player.x+=1;
          
           return
       }
        }

       }

       const keyPressed = command.keyPressed;
       const player = states.players[command.playerId];
       const moveFunction = acceptMoves[keyPressed]
       //FILTRO DE ERRO DE FUNÇÃO
       if(player && moveFunction){
           moveFunction(player);
           detectFrutCollision(player);
       }

    }
        function detectFrutCollision(command){
                for(const frutId in states.fruts){
                    const fruta = states.fruts[frutId];

                    if(command.x === fruta.x && command.y === fruta.y){
                        removeFrut({frutId:frutId})
                    }
                }
        }

    return {
        movePlayer,
        states,
        addPlayer,
        removerPlayer,
        addFrut,
        removeFrut,
        detectFrutCollision,
        setState,
        subscribe
    };
}//end createGame