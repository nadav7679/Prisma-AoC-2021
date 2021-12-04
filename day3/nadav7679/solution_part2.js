"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const data = fs
    .readFileSync(".\\input.txt", { encoding: "utf8" })
    .split("\r\n");
function getBinByCriteria(numbers, mostFrequent, indexFilter) {
    if (numbers.length === 1) {
        return numbers[0];
    }
    var res = new Array(12).fill(0);
    var getOnes = true;
    var filterdNumbers = new Array();
    var filter = 1;
    for (const bin of numbers) {
        const bytes = bin.split("");
        bytes.forEach((value, index) => {
            if (value === "0") {
                res[index] -= 1;
            }
            else {
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
    }
    else if (res[indexFilter] < 0) {
        filter = 0;
    }
    else {
        filter = 1;
    }
    if (!mostFrequent && filter === 1) {
        filter = 0;
    }
    else if (!mostFrequent && filter === 0) {
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
fs.writeFileSync(".\\answer_part2.txt", String(parseInt(oxy, 2) * parseInt(co2, 2)));
