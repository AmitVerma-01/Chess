"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
    }
    makeMove(sokcet, move) {
        // validation here
        // is it this user moves now
        // is it valid move
        // validation the type of the move using zod
        if (this.moveCount % 2 === 0 && sokcet !== this.player1) {
            console.log(this.moveCount);
            console.log("early return 1");
            return;
        }
        if (this.moveCount % 2 === 1 && sokcet !== this.player2) {
            console.log(this.moveCount);
            console.log("early return 2");
            return;
        }
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
            return;
        }
        // update board
        // push move to moves
        // check if game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white"
                }
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? "black" : "white"
                }
            }));
            return;
        }
        if (this.moveCount % 2 === 0) {
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: { move }
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: { move }
            }));
        }
        this.moveCount++;
        // update board for the both the players
    }
}
exports.Game = Game;
