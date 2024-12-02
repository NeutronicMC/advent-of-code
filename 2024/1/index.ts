const inputFile = await Bun.file("input.txt").text();
const lines = inputFile.split("\n");
const lists: [number[], number[]] = [[], []];

lines.forEach((line) => {
  if (line.length < 1) return;
  const items = line.split("   ").map((string) => parseInt(string));
  lists[0].push(items[0]);
  lists[1].push(items[1]);
});

lists.map((list) => list.sort((a, b) => a - b));

function calculateTotalDistance() {
  let distance = 0;
  for (let i = 0; i < lists[0].length; i++) {
    distance += Math.abs(lists[0][i] - lists[1][i]);
  }
  return distance;
}

function calculateSimularityScore() {
  const appearances = new Map();
  lists[1].forEach((val) => {
    const appearanceCount = appearances.get(val) || 0;
    appearances.set(val, appearanceCount + 1);
  });

  let similarity = 0;
  lists[0].forEach((val) => {
    const appearanceCount = appearances.get(val) || 0;
    similarity += val * appearanceCount;
  });
  return similarity;
}

console.log("Part one:", calculateTotalDistance());
console.log("Part two:", calculateSimularityScore());
