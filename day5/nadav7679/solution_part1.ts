import { RSA_PKCS1_OAEP_PADDING } from "constants";
import * as fs from "fs";

class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(other: Point): Point {
		var x = this.x + other.x;
		var y = this.y + other.y;
		return new Point(x, y);
	}

	subtract(other: Point): Point {
		var x = this.x - other.x;
		var y = this.y - other.y;
		return new Point(x, y);
	}

	isEqual(other: Point): boolean {
		if (other.x === this.x && other.y === this.y) {
			return true;
		}
		return false;
	}

	self_mult() {
		return this.x * this.y;
	}

	toString() {
		return `(${this.x}, ${this.y})`;
	}
}

function getStraightLine(p1: Point, p2: Point): Point[] {
	const diff = p1.subtract(p2);
	const isHorizontal = diff.y === 0;
	var line: Point[] = [p2];
	var inc: Point;

	if (isHorizontal) {
		inc = diff.x > 0 ? new Point(-1, 0) : new Point(1, 0);
	} else {
		inc = diff.y > 0 ? new Point(0, -1) : new Point(0, 1);
	}

	for (var count = 0; !p1.isEqual(p2); count++) {
		line.push(p1);
		p1 = p1.add(inc);
	}

	return line;
}

function parse(instruction: string): [Point, Point] {
	const numbers: Array<Array<string>> = instruction
		.split(" -> ")
		.map((value) => value.split(","));
	const p1 = new Point(Number(numbers[0][0]), Number(numbers[0][1]));
	const p2 = new Point(Number(numbers[1][0]), Number(numbers[1][1]));

	return [p1, p2];
}

var grid: any = {};
const data: string[] = fs
	.readFileSync(".\\input.txt", { encoding: "utf-8" })
	.split("\r\n");

for (var line of data) {
	const points = parse(line);
	if (!(points[0].subtract(points[1]).self_mult() === 0)) {
		// checks if the line is straight
		continue;
	}

	getStraightLine(points[0], points[1]).forEach((point, index) => {
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
	"..\\..\\..\\day5\\nadav7679\\answer_part1.txt",
	String(overlaps)
);

export {Point as Point}
export {parse as parse}
export {data as data}
export {overlaps as straightOverlaps}

// module.exports = {
// 	Point: Point,
// 	getStraigtLine: getStraightLine,
// 	overlaps: overlaps,
// 	data: data,
// 	parse: parse
// };
