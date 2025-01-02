import fs from "fs";

const ROBOT = "^";
const WALL = "#";
const EMPTY = ".";
const VISITED = "X";

const DIRECTIONS = {
  up: "up",
  down: "down",
  left: "left",
  right: "right",
};

const DIRECTION_CHANGES = {
  [DIRECTIONS.up]: DIRECTIONS.right,
  [DIRECTIONS.right]: DIRECTIONS.down,
  [DIRECTIONS.down]: DIRECTIONS.left,
  [DIRECTIONS.left]: DIRECTIONS.up,
};

const MOVES = {
  [DIRECTIONS.up]: (x, y) => [x - 1, y],
  [DIRECTIONS.right]: (x, y) => [x, y + 1],
  [DIRECTIONS.down]: (x, y) => [x + 1, y],
  [DIRECTIONS.left]: (x, y) => [x, y - 1],
};

function solveDaySix() {
  try {
    const grid = readFile();
    const spacesVisited = findRoute(grid);
    console.log(`Spaces visited: ${spacesVisited}`);
    return spacesVisited;
  } catch (error) {
    console.error("Error solving Day 6:", error);
    throw error;
  }
}

function findStart(grid) {
  if (!grid || !grid.length) {
    throw new Error("Invalid grid input");
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === ROBOT) {
        return [i, j];
      }
    }
  }
  //In case there is no ROBOT in the grid
  return [null, null];
}

function findRoute(grid) {
  const xLength = grid.length - 1;
  const yLength = grid[0].length - 1;
  let visitedPositions = new Set(); // Track unique positions
  let [x, y] = findStart(grid);
  let currDirection = DIRECTIONS.up;

  // Add starting position to visited set
  visitedPositions.add(`${x},${y}`);

  while (true) {
    let [newX, newY] = moveRobot(currDirection, x, y);

    // Check if we're out of bounds
    if (newX < 0 || newX > xLength || newY < 0 || newY > yLength) {
      return visitedPositions.size;
    }

    // If we hit a wall, change direction but stay in same position
    if (grid[newX][newY] === WALL) {
      currDirection = changeDirection(currDirection);
    } else {
      // Move to new position
      [x, y] = [newX, newY];
      visitedPositions.add(`${x},${y}`);
    }
  }
}

function changeDirection(currDirection) {
  return DIRECTION_CHANGES[currDirection];
}

function moveRobot(currDirection, x, y) {
  return MOVES[currDirection](x, y);
}

function readFile() {
  return fs
    .readFileSync("./input.txt", "utf8")
    .split("\n")
    .map((line) => line.split(""));
}

solveDaySix();
