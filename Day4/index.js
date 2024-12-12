import fs from "fs";

const FILE_PATH = "./input.txt";
const SAMX = "SAMX";
const XMAS = "XMAS";
const DIRECTIONS = [
  "Up",
  "Down",
  "Left",
  "Right",
  "Down-Right",
  "Down-Left",
  "Up-Right",
  "Up-Left",
];

const ROW_CHANGE = [-1, 1, 0, 0, 1, 1, -1, -1];
const COLUMN_CHANGE = [0, 0, -1, 1, 1, -1, 1, -1];

function SolveDayFour() {
  let array = readFile();
  // console.log("array", array);
  let rows = array.length;
  let cols = array[0].length;
  let total = 0;
  //Find all the combos of XMAS and SAMX in the file.
  //To do this
  for (let i = 0; i <= rows - 1; i++) {
    for (let j = 0; j <= cols - 1; j++) {
      total += checkIfXmasOrSamx(i, j, array, rows, cols);
    }
  }
  console.log(total);
}

const isValid = (row, col, rows, cols) => {
  return row >= 0 && row < rows && col >= 0 && col < cols;
};

function checkIfXmasOrSamx(x, y, array, rows, cols) {
  let total = 0;
  if (array[x][y] !== "X" && array[x][y] !== "S") {
    return 0;
  }

  for (let direction = 0; direction < 8; direction++) {
    let currString = array[x][y];
    let r = x;
    let c = y;
    let valid = true;

    // We need exactly 3 more characters after the first one
    for (let step = 0; step < 3; step++) {
      r += ROW_CHANGE[direction];
      c += COLUMN_CHANGE[direction];

      if (!isValid(r, c, rows, cols)) {
        valid = false;
        break;
      }
      currString += array[r][c];
    }

    // Only check if we got exactly 4 characters
    if (valid && currString.length === 4) {
      if (currString === XMAS) {
        total++;
      }
    }
  }

  return total;
}

function readFile() {
  const data = fs.readFileSync(FILE_PATH, "utf8");
  let lines = data.trim().split("\n");
  lines = lines.map((line) => line.split(""));

  return lines;
}

SolveDayFour();
