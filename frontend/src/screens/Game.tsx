import { useEffect, useState } from "react";
import Button from "../components/Button"
import ChessBoard from "../components/ChessBoard"
import { useSocket } from "../hooks/socket"
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";


const Game = () => {
  const socket = useSocket(); 
  const [chess, setChess]=useState(new Chess())
  const [board , setBoard] = useState(chess.board()) 

  useEffect(()=>{
    if(!socket){
      return ;
    }
    socket.onmessage = (event)=>{
       const message = JSON.parse(event.data)
      console.log(message)
      localStorage.setItem("t" , JSON.stringify(message))
      switch(message.type){
        case INIT_GAME : 
          setChess(new Chess())
          setBoard(chess.board())
          console.log("Game initialized");
          break;
        case MOVE : 
          // eslint-disable-next-line no-case-declarations
          const move = message.payload.move  
          console.log(move);
          chess.move(move);
          setBoard(chess.board())
          console.log("Move made");
          break;
        case GAME_OVER : 
          console.log("Game over");
          break;    
      }
    }
  },[socket,chess]) 


  if(!socket) return <div>
    connecting...
  </div>

  return (
    <div className="grid grid-cols-6 h-full p-5">
      <div className="col-span-4 flex justify-center items-center ">
        <ChessBoard board={board} socket={socket} chess={chess} setBoard={setBoard}/>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <Button onClick={()=>{
          socket.send(JSON.stringify({
            type : INIT_GAME
          }))
        }}>Play</Button>
      </div>
    </div>
  )
}

export default Game
