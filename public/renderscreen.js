export default function renderPlayers(canvas , game,requestAnimationFrame,correntePlayerId){
    const contexto = canvas.getContext('2d')
    contexto.fillStyle='white';
    contexto.clearRect(0,0,20,20);

    for(const playerId in game.states.players){
        const jogador = game.states.players[playerId];
        contexto.fillStyle = "black";
        contexto.fillRect(jogador.x,jogador.y,1,1)
    }
    for(const frutId in game.states.fruts){
        const fruta = game.states.fruts[frutId];
        contexto.fillStyle='green';
        contexto.fillRect(fruta.x,fruta.y,1,1);
    }
    const correntePlayer = game.states.players[correntePlayerId];
    if(correntePlayer){
        contexto.fillStyle='#f0db4f'
        contexto.fillRect(correntePlayer.x,correntePlayer.y,1,1)

    }
        requestAnimationFrame(()=>{
            renderPlayers(canvas,game,requestAnimationFrame,correntePlayerId)
        });
}