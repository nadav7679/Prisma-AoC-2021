import * as fs from "fs";

function getPosition(data: string[]): { depth: number; horizontal: number } {
  var depth: number = 0;
  var horizontal: number = 0;
  var count = 0;

  for (const instruct of data) {
    var amount: number = Number(instruct.slice(-1));
    var type: string = instruct.slice(0, instruct.indexOf(" "));

    // switch (type) {
    //   case "forward":
    //     horizontal += amount;
    //   case "up":
    //     depth -= amount;
    //   case "down":
    //     depth += amount;
    //   //   default:
    //   // console.log(type);
    // }

    if (type === "forward") {
      horizontal += amount;
    }
    if (type === "up") {
      depth -= amount;
    }
    if (type === "down") {
      depth += amount;
    }

    if (type != "forward" && type != "up" && type != "down") {
      console.log("gotcha");
    }

    if (depth <= 0) {
      console.log(depth);
    }

    // console.log(instruct)
    // console.log(`${horizontal}, ${depth}`);
    count++;
  }
  console.log(count === data.length);
  return { depth: depth, horizontal: horizontal };
}

const data = fs.readFileSync("./input.txt", { encoding: "utf8" }).split("\r\n");
const res = getPosition(data);
console.log(res);

fs.writeFileSync(".\\answer_part1.txt", String(res.depth * res.horizontal));
