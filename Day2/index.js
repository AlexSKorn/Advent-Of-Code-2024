import { checkPrime } from "crypto";
import fs from "fs";

function SolveDayTwoProblem() {
  const lines = readFile();

  console.log("lines.length", lines.length);
  return lines.length;
}

function readFile() {
  const data = fs.readFileSync("./input.txt", "utf8");
  const lines = data.trim().split("\n");
  let safetyLines = [];

  for (const line of lines) {
    // Split the line into an array
    let lineData = line.split(" ");

    // Convert strings to numbers (fixed map usage)
    lineData = lineData.map((num) => parseInt(num));

    // Check conditions
    const legal = checkIfLegal(lineData);
    const difference = checkDifference(lineData);

    if (legal && difference) {
      safetyLines.push(lineData);
    }
  }
  return safetyLines;
}

function checkIfLegal(line) {
  if (!line || line.length <= 1) return true;

  // Check if increasing
  const isIncreasing = line.every((num, i) => i === 0 || line[i - 1] < num);

  // Check if decreasing
  const isDecreasing = line.every((num, i) => i === 0 || line[i - 1] > num);

  return isIncreasing || isDecreasing;
}

function checkDifference(line) {
  return line.every((num, i) => {
    // Skip the first element since it has no previous number to compare with
    if (i === 0) return true;

    let difference = Math.abs(line[i - 1] - num);
    return difference >= 1 && difference <= 3;
  });
}

SolveDayTwoProblem();
