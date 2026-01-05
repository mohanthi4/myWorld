import { chunk } from "jsr:@std/collections/chunk";
import { LADDER_JUMPS, SNAKE_JUMPS,BOARD_WIDTH } from "./data.js";

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

const playerCheck = (row, player1, player2) =>
  (row === player2.token) ? (player2.token + player1.token) : player1.token;

const placeToken = (row, playerData) => {
  const rowCopy = [...row];

  playerData.forEach((player) => {
    if (rowCopy.includes(player.position)) {
      const index = rowCopy.indexOf(player.position);
      let player2 = 0;
      if (player2 < playerData.length) {
        row[index] = playerCheck(
          row[index],
          player,
          playerData[player2],
        );
      }
    }
  });
};

const formatBoard = (board, playerData) => {
  const rows = chunk([...board].reverse(), BOARD_WIDTH);

  return rows.map((row, i) => {
    placeToken(row, playerData);
    return i % 2 ? row.reverse() : row;
  });
};

const special = (row) => {
  if (SNAKE_JUMPS[row]) {
    return `🐍${row}`;
  }
  if (LADDER_JUMPS[row]) {
    return `🪜${row}`;
  }
  return row;
};

const boardState = (program) => {
  return program.map((x) =>
    x.map((y) => {
      const element = special(y);
      return element.toString().padStart(8);
    }).join("")
  )
    .join("\n\n");
};

export const dispalyGameBoard = (elements, playerData) => {
  console.clear();
  gameInfo();
  playerInfo(playerData);
  const final = formatBoard(elements, playerData);
  console.log(boardState(final));
};
