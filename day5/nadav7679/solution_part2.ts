import * as fs from "fs";
import { Point, parse } from "./solution_part1";

function getLine(p1: Point, p2: Point): Point[] {
	const diff = p1.subtract(p2);
	const isHorizontal = diff.y === 0;
	var line: Point[] = [p2];
	var inc: Point;

	if (isHorizontal) {
		inc = diff.x > 0 ? new Point(-1, 0) : new Point(1, 0);
	} else if (diff.x === 0) {
		inc = diff.y > 0 ? new Point(0, -1) : new Point(0, 1);

	} else {
		const xInc = diff.x > 0 ? -1 : 1	
		const yInc = diff.y > 0 ? -1 : 1
		inc = new Point(xInc, yInc)	
	}

	for (var count = 0; !p1.isEqual(p2); count++) {
		line.push(p1);
		p1 = p1.add(inc);
	}
	return line;
}


// Almost Copy pasta:

var grid: any = {};
const data: string[] = fs
	.readFileSync(".\\input.txt", { encoding: "utf-8" })
	.split("\r\n");

for (var line of data) {
	const points = parse(line);
	getLine(points[0], points[1]).forEach((point, index) => {
		if (String(point) in grid) {
			grid[String(point)]++;
		} else {
			grid[String(point)] = 1;
		}
	});
}

const overlaps = Object.values(grid).reduce((pre: any, value: any, index) => {
	if (index === 1 && pre === 1) {
		return 0;
	} else if (value > 1) {
		return pre + 1;
	} else return pre;
});


fs.writeFileSync(
	"..\\..\\..\\day5\\nadav7679\\answer_part2.txt",
	String(overlaps)
);
