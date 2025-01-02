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

function solveDaySix() {
  console.log("this is solving day 6");
  const grid = readFile();
  const spacesVisitied = findRoute(grid);
  console.log(spacesVisitied);
  return spacesVisitied;
}

function findStart(grid) {
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
  switch (currDirection) {
    case DIRECTIONS.up:
      return DIRECTIONS.right;
    case DIRECTIONS.right:
      return DIRECTIONS.down;
    case DIRECTIONS.down:
      return DIRECTIONS.left;
    case DIRECTIONS.left:
      return DIRECTIONS.up;
  }
}

function moveRobot(currDirection, x, y) {
  switch (currDirection) {
    case DIRECTIONS.up:
      return [x - 1, y];
    case DIRECTIONS.right:
      return [x, y + 1];
    case DIRECTIONS.down:
      return [x + 1, y];
    case DIRECTIONS.left:
      return [x, y - 1];
  }
}

function readFile() {
  const data = fs.readFileSync("./input.txt", "utf8");
  const rowArray = [];

  data.split("\n").forEach((line) => {
    let temp = [];
    line.split("").forEach((char) => {
      temp.push(char);
    });
    rowArray.push(temp);
  });

  // console.log(rowArray);

  return rowArray;
}

solveDaySix();
