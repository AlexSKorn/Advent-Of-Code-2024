import fs from "fs";

function solveDaySeven() {
  console.log("solving day 7");
}

function readFile() {
  const data = fs.readFileSync("./input.txt", "utf8");
  console.log("Reading file");
}

solveDaySeven();
