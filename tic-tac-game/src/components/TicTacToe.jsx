import React, { useEffect, useState } from "react";
import GameOver from "./GameOver";
import Board from "./Board";
import GameState from "./GameState";
import Reset from "./Reset";

const PLAYER_X = "X";
const PLAYER_O = "O";

const winningCombinations = [
  //rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //cols
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //diagonal
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  // console.log("check winner")
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      tileValue1 !== null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (areAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

const TicTacToe = () => {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    // console.log(index)

    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] !== null) {
      return;
    }
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === PLAYER_X) {
      setPlayerTurn(PLAYER_O);
    } else {
      setPlayerTurn(PLAYER_X);
    }
  };

  const handleReset = () =>{
    // console.log('reset')

    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  }

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
      <h1>Tic tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState= {gameState}  onReset = {handleReset}/>
    </div>
  );
};

export default TicTacToe;
