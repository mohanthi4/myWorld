import { chunk } from "jsr:@std/collections/chunk";
import { BOARD_WIDTH, LADDER_JUMPS, SNAKE_JUMPS } from "./data.js";

const playerInfo = (playerData) => {
  console.log("%c\t\tPLAYER DETAILS:", "color:blue");
  for (let index = 0; index < playerData.length; index++) {
    console.log(`  ${playerData[index].name} : ${playerData[index].token}`);
  }
  console.log();
};

const gameInfo = () => {
  console.log("%c\t\tSNAKES AND LADDERS :\n", "color:yellow");
  console.log("%c 🐍 : 8 -> 2 , 13 -> 11\n ", "color:red");
  console.log("%c 🪜 : 3 -> 6 , 7 -> 15 \n", "color:green");
};

const playerCollisionCheck = (row, player1, player2) =>
  (row === player2.token) ? (player2.token + player1.token) : player1.token;

const placePlayerTokens = (row, playerData) => {
  const rowCopy = [...row];

  playerData.forEach((player) => {
    if (rowCopy.includes(player.position)) {
      const index = rowCopy.indexOf(player.position);
      const player2 = 0;
      if (player2 < playerData.length) {
        row[index] = playerCollisionCheck(
          row[index],
          player,
          playerData[player2],
        );
      }
    }
  });
};

const createBoardGrid = (board, playerData) => {
  const rows = chunk([...board].reverse(), BOARD_WIDTH);

  return rows.map((row, i) => {
    placePlayerTokens(row, playerData);
    return i % 2 ? row.reverse() : row;
  });
};

const applySnakeOrLadder = (row) => {
  if (SNAKE_JUMPS[row]) {
    return `🐍${row}`;
  }
  if (LADDER_JUMPS[row]) {
    return `🪜${row}`;
  }
  return row;
};

const elementArrangement = (element) => applySnakeOrLadder(element).toString().padStart(8);

const boardState = (program) => {
  return program.map((x) =>
    x.map(elementArrangement).join("")
  )
    .join("\n\n");
};

export const dispalyGameBoard = (elements, playerData) => {
  console.clear();
  gameInfo();
  playerInfo(playerData);
  const final = createBoardGrid(elements, playerData);
  console.log(boardState(final));
};
