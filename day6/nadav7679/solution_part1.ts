import * as fs from "fs";

let fishes: number[] = fs
	.readFileSync(".\\input.txt", { encoding: "utf-8" })
	.split(",")
	.map((value) => Number(value));

for (let day = 0; day < 80; day++) {
	let babyFishes = 0;
	let fishesOld = fishes;

	fishes = fishesOld.map((val) => {
		if (val === 0) {
			babyFishes++;
			return 6;
		} else {
			val -= 1;
			return val;
		}
	});

	for (let count = 0; count < babyFishes; count++) {
		fishes.push(8);
	}
}
const res = fishes.length;
fs.writeFileSync(
	"..\\..\\..\\day6\\nadav7679\\answer_part1.txt",
	String(res)
);
