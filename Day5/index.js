import fs from "fs";

function solveDayFive() {
  const [rules, pages] = readFile();
  const rulesMap = setupMap(rules);
  const finalPages = validPages(rulesMap, pages);
  console.log("finalPages", finalPages);
  const finalValue = finalPages.reduce((acc, curr) => acc + curr, 0);
  console.log("finalValue", finalValue);
  return finalValue;
}

function readFile() {
  const data = fs.readFileSync("./input.txt", "utf8");

  const rules = [];
  const pages = [];

  data.split("\n").forEach((line) => {
    if (line.includes(",")) {
      pages.push(line);
    } else {
      rules.push(line);
    }
  });

  return [rules, pages];
}

function setupMap(rules) {
  const orderMap = new Map();

  rules.forEach((rule) => {
    const [before, after] = rule.split("|");

    // Store dependencies for the 'before' page
    if (!orderMap.has(before)) {
      orderMap.set(before, {
        mustComeBefore: new Set(),
        mustComeAfter: new Set(),
      });
    }

    // Store dependencies for the 'after' page
    if (!orderMap.has(after)) {
      orderMap.set(after, {
        mustComeBefore: new Set(),
        mustComeAfter: new Set(),
      });
    }

    // Add bidirectional relationships
    orderMap.get(before).mustComeBefore.add(after);
    orderMap.get(after).mustComeAfter.add(before);
  });

  return orderMap;
}

function validPages(rulesMap, pages) {
  const finalPages = [];

  for (const pageLine of pages) {
    const pagesArray = pageLine.split(",").map(Number); // Convert to numbers
    let isValid = true;

    // Check every pair of pages
    for (let i = 0; i < pagesArray.length; i++) {
      for (let j = i + 1; j < pagesArray.length; j++) {
        const firstPage = pagesArray[i];
        const secondPage = pagesArray[j];

        // Check if there's a rule requiring secondPage to come before firstPage
        if (
          rulesMap.has(String(secondPage)) &&
          rulesMap.get(String(secondPage)).mustComeBefore.has(String(firstPage))
        ) {
          isValid = false;
          break;
        }
      }
      if (!isValid) break;
    }

    // If valid, find middle number
    if (isValid) {
      const middleNum = findMiddleNumber(pagesArray);
      finalPages.push(middleNum);
    }
  }

  return finalPages;
}

function findMiddleNumber(pages) {
  const middle = Math.floor(pages.length / 2);

  // If array length is odd
  if (pages.length % 2 !== 0) {
    return parseInt(pages[middle]);
  }
}

solveDayFive();
