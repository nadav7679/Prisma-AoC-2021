const { data, sum, coordinates, getLineDetials, apply_x_line, apply_y_line } = require('./solution_part1');

const apply_diagonal_line = (line) => {
    const { x0, y0, x1, y1, minY, maxY } = getLineDetials(line);

    Array.from({ length: maxY - minY + 1 }).forEach((_, i) => {
        const x_dir = (x1 > x0) ? 1 : -1
        const y_dir = (y1 > y0) ? 1 : -1
        const curr_x = x0 + (x_dir * i)
        const curr_y = y0 + (y_dir * i)
        let y_cell = coordinates[curr_y]

        if (y_cell === undefined) {
            coordinates[curr_y] = { [curr_x]: 1 }
        } else {
            if (y_cell[curr_x] === 1) {
                sum.value += 1
            }
            y_cell[curr_x] = (y_cell[curr_x] || 0) + 1
        }
    })
}

data
    .forEach(line => {
        const [x0, y0] = line[0];
        const [x1, y1] = line[1];

        if (y0 === y1) {
            apply_y_line(line)
        } else if (x0 === x1) {
            apply_x_line(line)
        } else {
            apply_diagonal_line(line)
        }
    })

// const _sum = Object.values(coordinates)
//     .reduce((sum, cur) =>
//         sum += Object.values(cur).filter(x => x > 1).length
//         , 0)

console.log(sum.value);
