import fs from "fs";

const MULTIPLICATION_PATTERN = /mul\((\d{1,3}),(\d{1,3})\)/g;
const FILE_PATH = "./input.txt";

function readFile() {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    validateInput(data);
    return data;
  } catch (error) {
    console.error("Error reading file: ", error);
    process.exit(1);
  }
}

function parseMultiplications(fileText) {
  const regex = MULTIPLICATION_PATTERN;
  let total = 0;

  let match;
  while ((match = regex.exec(fileText)) != null) {
    total += parseInt(match[1]) * parseInt(match[2]);
  }

  return total;
}

function validateInput(text) {
  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Invalid input: Expected non-empty string");
  }
}

function solveDayThreeProblem() {
  const fileText = readFile();
  const total = parseMultiplications(fileText);
  console.log(total);
  return total;
}

solveDayThreeProblem();
