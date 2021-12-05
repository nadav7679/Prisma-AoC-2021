import * as fs from "fs";
import * as nj from "numjs";

function parse(line: string) {
	let numArr: number[] = [];
	for (var i = 0; i < line.length; i += 3) {
		// if (line[i] === ' ' && line[i+1] === ' ') {
		const num = Number(line.slice(i, i + 3).trim());
		// console.log(num)

		if (!isNaN(num)) {
			numArr.push(num);
		}
	}
	return numArr;
}

function getBoardsArray(data: string[]): {} {
	var boards: any = {};
	var countBoard = 0;
	for (var i = 1; i < data.length - 5; i += 6) {
		countBoard++;
		boards[countBoard] = [
			parse(data[i + 1]),
			parse(data[i + 2]),
			parse(data[i + 3]),
			parse(data[i + 4]),
			parse(data[i + 5]),
		];
	}
	return boards;
}

function bingoQuestionMark(board: Array<Array<number>>): boolean {
	for (const line of board) {
		if (line.reduce((numSum, val) => numSum + val, 0) === -5) {
			return true;
		}
	}

	for (var i = 0; i < 5; i++) {
		var column = board.map((line) => line[i]);
		if (column.reduce((numSum, val) => numSum + val, 0) === -5) {
			return true;
		}
	}

	return false;
}

function markDraw(
	board: Array<Array<number>>,
	draw: number
): Array<Array<number>> {
	const markedBoard = board.map((line, lineIndex) => {
		var markedLine = line.map((value) => {
			if (value === draw) {
				return -1;
			} else {
				return value;
			}
		});

		return markedLine;
	});

	return markedBoard;
}

function winnerSum(board: Array<Array<number>>): number {
	const lineSums: number[] = board.map((line) => {
		const lineSum = line.reduce((pre, value) => {

            if (pre === -1) {
                pre = 0
            }
			const numToAdd = value === -1 ? 0 : value;
			return pre + numToAdd;
		});

		return lineSum;
	});

	const boardSum = lineSums.reduce((tots, value) => tots + value);
	return boardSum;
}

const data: string[] = fs
	.readFileSync(".\\input.txt", { encoding: "utf-8" })
	.split("\r\n");
const drawPool = data[0].split(",");

var boards = getBoardsArray(data);
var winners: number[] = [];

for (var draw of drawPool) {
	for (var boardNum in boards) {
		var board = markDraw(boards[String(boardNum)], Number(draw));
		boards[boardNum] = board;

		if (bingoQuestionMark(board)) {
			var boardSum = winnerSum(board);
			winners.push(boardSum * Number(draw));
			console.log(draw, boardNum, board);
			delete boards[boardNum];
		}
	}
}

fs.writeFileSync(".\\answer_part2.txt", String(winners[-1]));
