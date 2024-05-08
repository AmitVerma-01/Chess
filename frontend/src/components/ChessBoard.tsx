/* eslint-disable @typescript-eslint/no-explicit-any */
import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

const ChessBoard = ({board ,socket , chess , setBoard} : {board : ({
  square: Square;
  type: PieceSymbol;
  color: Color; 
} | null)[][];
socket : WebSocket;
chess : any ;
setBoard : any;
}
) => {

  const [from , setFrom] = useState<null | Square>(null);
  // const [to , setTo] = useState<null | Square>(null);
  

  return (
    <div className="rounded-md ">
      {
        board.map((row,i)=>{
          return <div className="flex " key={i}>
            {
              row.map((square,j)=>{
                return <div key={j} onClick={()=>{
                  const squareRepresentation = String.fromCharCode(97 + (j % 8) ) + "" + (8 - i)                  
                  console.log(squareRepresentation)
                  if(!from){
                    setFrom(square?.square ?? null)
                  }else{
                    socket.send(JSON.stringify({
                      type : MOVE,
                      payload :{ move : {
                        from,
                        to : squareRepresentation
                      }}
                    }))
                    chess.move({from , to : squareRepresentation});
                    setBoard(chess.board())
                    console.log({from,squareRepresentation});
                    setFrom(null)
                  }
                }} className={`w-20 h-20 flex justify-center items-center ${(i+j)%2 ===0 ? 'bg-green-600' : 'bg-green-300'}`} >
                    {/* <div>{square ? square.type : ''}</div> */}
                    <div>{
                      square ? <img src={`${square.color==="b" ? square.type : square.type.toUpperCase()+" copy"}.png`} alt="" />
                      : null} </div>
                </div>
              })
            }
          </div>
        })
      
      }
       
    </div>
  )
}

export default ChessBoard
