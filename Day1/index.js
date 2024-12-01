import fs from "fs";

function parseNumbers(line) {
  const [first, second] = line.split(/\s+/);
  const firstNum = parseInt(first);
  const secondNum = parseInt(second);

  if (isNaN(firstNum) || isNaN(secondNum)) {
    throw new Error(`Invalid number in line: ${line}`);
  }

  return [firstNum, secondNum];
}

function readInputFile() {
  try {
    const data = fs.readFileSync("./input.txt", "utf8");
    const lines = data.trim().split("\n");

    const firstNumbers = [];
    const secondNumbers = [];

    for (const line of lines) {
      const [first, second] = parseNumbers(line);
      firstNumbers.push(first);
      secondNumbers.push(second);
    }

    return {
      firstNumbers: firstNumbers.sort((a, b) => b - a),
      secondNumbers: secondNumbers.sort((a, b) => b - a),
    };
  } catch (error) {
    console.error("Error processing input file:", error);
    process.exit(1);
  }
}

function calculateTotal(firstNumbers, secondNumbers) {
  return firstNumbers.reduce(
    (sum, curr, index) => sum + Math.abs(curr - secondNumbers[index]),
    0,
  );
}

function solveDayOneProblem() {
  const { firstNumbers, secondNumbers } = readInputFile();
  const total = calculateTotal(firstNumbers, secondNumbers);
  console.log(total);
  return total;
}

solveDayOneProblem();
