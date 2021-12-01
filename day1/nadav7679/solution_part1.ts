const fs = require("fs");

async function getIncrements(data: string[]): Promise<number> {
  const measurements = data
  var measurements_shifted = [...measurements];

  measurements_shifted.shift();
  measurements.pop();

  var counter = Promise.all(
    measurements.map(async (value: string, index: number): Promise<number> => {
      const num = Number(measurements_shifted[index]) - Number(value);
      return num;
    })
  ).then((data) => {
    var counter = 0;
    for (const value of data) {
      if (value > 0) {
        counter++;
      }
    }
    return counter;
  });
  return counter;
}

fs.readFile(".\\input.txt", "utf8", (err, data: string) => {
  if (err) {
    console.log(err);
    return;
  }
  const increments = getIncrements(data.split("\r\n"));
  increments.then((value) => {
    fs.writeFile("answer_part1.txt", String(value), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
});

exports.getIncrements = getIncrements