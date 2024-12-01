import fs from "fs";

function readInputFile() {
  let left = [];
  let right = [];
  const data = fs.readFileSync("./input.txt", "utf8");
  const dataArray = data.trim().split("\n");
  for (const num of dataArray) {
    const line = num.split("   ");
    left.push(parseInt(line[0]));
    right.push(parseInt(line[1]));
  }
  left.sort((a, b) => b - a);
  right.sort((a, b) => b - a);
  return [left, right];
}

function solveDayOneProblem() {
  const [left, right] = readInputFile();
  let total = 0;
  //Get the absolute value between the two arrays, add everything up
  for (let i = 0; i < left.length; i++) {
    total += Math.abs(left[i] - right[i]);
  }
  console.log(total);
}

solveDayOneProblem();
