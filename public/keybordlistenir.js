 export default function createKeyBordListenir(document){

    const state ={
        observers: [],
        playerId:null
    }
    function setPlayerId(playerId){
        state.playerId=playerId;
    }
    function subscribe(observerFunction){
        state.observers.push(observerFunction)
    }
    function notifyAll(command){
        for(const observerFunction of state.observers){
            observerFunction(command);
        }
    }
     document.addEventListener('keydown',keyclick)

function keyclick(event){
    const keyPressed = event.key;

    const command ={
        type:'move-player',
        playerId:state.playerId,
        keyPressed
    }
        notifyAll(command);

}
return{
    subscribe,
    setPlayerId
}
}