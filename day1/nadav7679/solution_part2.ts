const fs = require("fs");
const part1 = require("./solution_part1");

const data = fs.readFileSync(".\\input.txt", "utf-8").split("\r\n");

var windowedMeasure: number[] = [];

for (var index = 0; index < data.length - 1; index++) {
  windowedMeasure.push(
    Number(data[index]) + Number(data[index + 1]) + Number(data[index + 2])
  );
}

var res = part1.getIncrements(windowedMeasure);
res.then((value) => {
  console.log(value);
  fs.writeFile("answer2.txt", String(value), (err) => {
    if (err) {
      console.log(err);
    }
  });
});
console.log(res);
