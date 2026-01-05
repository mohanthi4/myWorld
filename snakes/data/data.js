export const BOARD_WIDTH = 4;
export const WIN_POSITION = 16;
export const SNAKE_JUMPS = { 8: 2, 13: 11 };
export const LADDER_JUMPS = { 3: 6, 7: 15 };

const getPlayerDetails = () => {
  return {
    name: prompt("enter player name: "),
    token: prompt("enter player token: "),
    position: 0,
  };
};

const playersInformation = () => {
  const playerData = [];
  const totalPlayers = prompt("how many players are playing (minimum = 1): ");

  for (let index = 0; index < totalPlayers; index++) {
    playerData.push(getPlayerDetails());
  }
  return playerData;
};

const createBoard = () => Array.from({ length: 16 }, (_, i) => i + 1);

export const gameData = () => {
  const players = playersInformation();
  return {
    board: createBoard(),
    players,
    currentPlayer: players[0],
    state: 1,
  };
};
