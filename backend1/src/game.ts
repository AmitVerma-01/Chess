import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./message";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private startTime: Date;
  public board: Chess;
  private moveCount =0 ;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    this.player1.send(JSON.stringify({
      type : INIT_GAME,
      payload : {
        color : "black"
      }
    }))

    this.player2.send(JSON.stringify({
      type : INIT_GAME,
      payload : {
        color : "white"
      }
    }))

  }

  makeMove(sokcet: WebSocket, move: {
    from: string,
    to: string
  }) {
    // validation here
    // is it this user moves now
    // is it valid move
    // validation the type of the move using zod
    if (this.moveCount % 2 === 0 && sokcet !== this.player1) {
      console.log(this.moveCount)
      console.log("early return 1");
      return 
    }
    if (this.moveCount % 2 === 1 && sokcet !== this.player2) {
      console.log(this.moveCount)
      console.log("early return 2");
      return
    }
    try {
      this.board.move(move)
      
    } catch (error) {
      console.log(error)
      return
    }
    // update board
    // push move to moves
    // check if game is over

    if(this.board.isGameOver()){
      this.player1.send(JSON.stringify({
        type : GAME_OVER,
        payload : {
          winner : this.board.turn() == "w" ? "black" : "white"
        }
      }))
      this.player2.send(JSON.stringify({
        type : GAME_OVER,
        payload : {
          winner : this.board.turn() == "w" ? "black" : "white"
        }
      }))
      return ;
    }

    if(this.moveCount % 2 === 0){
      this.player2.send(JSON.stringify({
        type : MOVE,
        payload : {move}
      }))}
      else{
        this.player1.send(JSON.stringify({
          type : MOVE,
          payload : {move}
        }))
      }
      this.moveCount++;

    // update board for the both the players
  }
}
