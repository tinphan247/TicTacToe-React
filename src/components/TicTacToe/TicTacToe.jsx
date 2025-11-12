import React, { useState } from "react";
import "./TicTacToe.css";

const TicTacToe = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), location: null },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const current = history[stepNumber];
  const winnerInfo = calculateWinner(current.squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningSquares = winnerInfo ? winnerInfo.line : [];

  function handleClick(i) {
    const pastHistory = history.slice(0, stepNumber + 1);
    const current = pastHistory[pastHistory.length - 1];
    const squares = current.squares.slice();
    if (winner || squares[i]) return;

    squares[i] = xIsNext ? "X" : "O";
    const location = { row: Math.floor(i / 3) + 1, col: (i % 3) + 1 };
    setHistory(pastHistory.concat([{ squares, location }]));
    setStepNumber(pastHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function resetGame() {
    setHistory([{ squares: Array(9).fill(null), location: null }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const moves = history.map((step, move) => {
    const desc = move
        ? `Go to move (${step.location?.row}, ${step.location?.col})`
        : "Go to game start";

    return (
      <li key={move}>
        {move === stepNumber ? (
          <span>You are at move #{move}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{desc}</button>
        )}
      </li>
    );
  });

  const sortedMoves = isAscending ? moves : moves.slice().reverse();

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (stepNumber === 9) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // tạo board bằng 2 vòng lặp
// tạo board bằng 2 vòng lặp
const board = [];
for (let row = 0; row < 3; row++) {
  const cells = [];
  for (let col = 0; col < 3; col++) {
    const i = row * 3 + col;
    const value = current.squares[i]; // X hoặc O hoặc null
    const valueClass =
      value === "X" ? "x-symbol" : value === "O" ? "o-symbol" : "";

    cells.push(
      <div
        key={i}
        className={`boxes ${winningSquares.includes(i) ? "highlight" : ""} ${valueClass}`}
        onClick={() => handleClick(i)}
      >
        {value}
      </div>
    );
  }
  board.push(
    <div key={row} className={`row${row + 1}`}>
      {cells}
    </div>
  );
}


  return (
  <div className="container">
    <h1 className="title">
      Tic Tac Toe Game In <span>React</span>
    </h1>

    {/* Bọc board + info vào game-container */}
    <div className="game-container">
  <div className="board">{board}</div>

  <div className="moves-container">
    <div className="info">
      <button className="sort" onClick={() => setIsAscending(!isAscending)}>
        Sort {isAscending ? "Descending" : "Ascending"}
      </button>
      <ul>{sortedMoves}</ul>
    </div>
  </div>
</div>

    <div className="status">{status}</div>
    <button className="reset" onClick={resetGame}>
      Reset
    </button>
  </div>
);

};

// tính người thắng
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default TicTacToe;
