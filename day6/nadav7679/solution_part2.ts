import * as fs from "fs";
import { array } from "numjs";

const daysLimit = 256;
let fishes: number[] = fs
	.readFileSync(".\\input.txt", { encoding: "utf-8" })
	.split(",")
	.map((value) => Number(value));

const emptyBins = {
	"0": 0,
	"1": 0,
	"2": 0,
	"3": 0,
	"4": 0,
	"5": 0,
	"6": 0,
	"7": 0,
	"8": 0,
};

let bins = { ...emptyBins };
for (let num of fishes) {
	bins[num] += 1;
}

for (let day = 0; day < daysLimit; day++) {
	const tmpBins = { ...emptyBins };

	for (const [key, value] of Object.entries(bins)) {
		if (key === "0") {
			tmpBins["6"] += value;
			tmpBins["8"] += value;
			continue;
		}

		tmpBins[Number(key) - 1] += value;
	}
	bins = tmpBins;
}

const res = Object.values(bins).reduce((resVal, curVal) => resVal + curVal);
fs.writeFileSync(
	"..\\..\\..\\day6\\nadav7679\\answer_part2.txt",
	String(res)
);
