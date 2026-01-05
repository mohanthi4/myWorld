import { gameData } from "./data/data.js";
import { startGame } from "./snakes.js";

const main = () => {
  const gameState = gameData();
  startGame(gameState);
};

main();
