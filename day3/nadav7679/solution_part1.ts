import * as fs from "fs";

const data: string[] = fs
  .readFileSync(".\\input.txt", { encoding: "utf8" })
  .split("\r\n");

var res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

for (const bin of data) {
  const bytes = bin.split("");

  bytes.forEach((value, index) => {
    if (value === "0") {
      res[index] -= 1;
    } else {
      res[index] += 1;
    }
  });
}

var gamma = "";
var epsilon = "";
res.forEach((value, index) => {
  if (value === 0) {
    console.log("problem!");
  } else if (value > 0) {
    gamma += "1";
    epsilon += "0";
  } else {
    gamma += "0";
    epsilon += "1";
  }
});

console.log(gamma);
console.log(epsilon);

console.log(parseInt(gamma, 2))
console.log(parseInt(epsilon, 2))

fs.writeFileSync('.\\answer_part1', String(parseInt(gamma, 2)*parseInt(epsilon, 2)))
