import './App.css';
import { ScoreBoard } from './Components/Score';
import Board from './Components/Board';
import React, { useState } from 'react';
import { ResetButton } from './Components/ResetButton';

function App() {

  const Win_Condition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlayer, setXplayer] = useState(true);
  const [scores, setScores] = useState({xScore:0, oScore:0});
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleBoxClick = (boxIdx) => {
    const updateBoard = board.map((value, idx) => {
      if(idx === boxIdx) {
        return xPlayer === true ? "X" : "O";
      } else {
        return value;
      }
    })

    const winner = checkWinner(updateBoard);

    if (winner) {
      if(winner === "O") {
        let {oScore} = scores;
        oScore +=1
        setScores({...scores, oScore})
      } else {
        let {xScore} = scores;
        xScore +=1
        setScores({...scores, xScore})
      }
    }

    setBoard(updateBoard);

    setXplayer(!xPlayer);
  }

  const checkWinner = (board) => {


    for ( let i = 0; i < Win_Condition.length; i++) {
      const [x, y, z] = Win_Condition[i];
      
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      } 
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }


  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlayer={xPlayer}/>
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick}/>
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;

