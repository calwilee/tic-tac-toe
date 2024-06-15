import { useState } from "react";


function Square({ value, onSquareClick, hilight = 'square'}){
  return (
  <button className ={hilight} onClick = {onSquareClick}>
    <text>{value}</text>
  </button>
  );
}


function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if(squares[i] || calculateWinner(squares)){
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext){
      nextSquares[i] = "X";
    }
    else{
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const hilights = Array(9).fill("square")
  const winner = calculateWinner(squares);
  let status;
  console.log(winner)
  if (winner){
    if (winner === 'tie'){
      status = "Tie"
    }else{
      status = "Winner: " + winner[0]
      for (let i = 0; i < 3; i++){
        hilights[winner[1][i]] = "shiny";
      }

    }
  }
  else{
    let nextp;
    if (xIsNext){
      nextp = "X";
    }else{
      nextp = "O";
    }
    status = "Next Player: " + nextp;
  }

  return (
    <div class = "centered">
      <div className = "status">
        {status}
      </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} hilight = {hilights[0]}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} hilight = {hilights[1]}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} hilight = {hilights[2]}/>
      </div>
      
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} hilight = {hilights[3]}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} hilight = {hilights[4]}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} hilight = {hilights[5]}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} hilight = {hilights[6]}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} hilight = {hilights[7]}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} hilight = {hilights[8]}/>
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history , setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];


  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }
  const hi = 2;
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 == 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key = {move}>
        <button className = "gamebutton" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay={handlePlay} />
      </div>
      <div class = "centered1">
      <div className = "log_header">
        move log
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>

      </div>
      
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const arr1 = [a, b, c]
      return squares[a], [squares[a], arr1];
    }
  }
  function isNull(inputArray){
    for (var i = 0, len = inputArray.length; i < len; i += 1)
      if (inputArray[i] == null)
        return false;
    return true;
  }
  if (isNull(squares)){
    return 'tie';
  }
  return null;
}
