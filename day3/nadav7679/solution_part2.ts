import * as fs from "fs";

const data: string[] = fs
  .readFileSync(".\\input.txt", { encoding: "utf8" })
  .split("\r\n");
// console.log(data);

type trueFalse = 1 | -1;
function getBinByCriteria(
  numbers: string[],
  mostFrequent: boolean,
  indexFilter: number
): string {
  if (numbers.length === 1) {
    return numbers[0];
  }

  var res: number[] = new Array(12).fill(0);
  var getOnes = true;
  var filterdNumbers: string[] = new Array();
  var filter = 1;

  for (const bin of numbers) {
    const bytes = bin.split("");

    bytes.forEach((value, index) => {
      if (value === "0") {
        res[index] -= 1;
      } else {
        res[index] += 1;
      }
    });
  }
  //     var res = res.forEach((value, index) => {
  //       value *= mostFrequent; // A flag by which I know wether to take the most frequent or least frequent
  //     });
  //   }

  if (res[indexFilter] === 0) {
    console.log("We got a problem");
  } else if (res[indexFilter] < 0) {
    filter = 0;
  } else {
    filter = 1;
  }

  if (!mostFrequent && filter === 1) {
    filter = 0;
  } else if (!mostFrequent && filter === 0) {
    filter = 1;
  }

  numbers.forEach((value, index) => {
    if (Number(value[indexFilter]) === filter) {
      filterdNumbers.push(value);
    }
  });

  //   console.log(filterdNumbers);

  return getBinByCriteria(filterdNumbers, mostFrequent, indexFilter + 1);
}

const test = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

const oxy = getBinByCriteria(data, true, 0);
const co2 = getBinByCriteria(data, false, 0);
const test2 = getBinByCriteria(test, false, 0);

console.log(test2);
// console.log(oxy, co2)

fs.writeFileSync(
  ".\\answer_part2.txt",
  String(parseInt(oxy, 2) * parseInt(co2, 2))
);
