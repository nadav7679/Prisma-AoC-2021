const fs = require('fs')
const path = require('path')


file_name = 'input.txt'
file_path = path.join(__dirname, file_name)

const raw_data = fs.readFileSync(file_path, 'utf8')

const coordinates = {} // {y0: {x0: num0, x1: num1}, y1: {...}, ...}
const sum = { value: 0 };

const data = raw_data
    .trim()
    .split('\n')
    .map(line => line.split(' -> ')
        .map(position => position
            .split(',')
            .map(cord => parseInt(cord))
        )
    )

const getLineDetials = (line) => {
    const [x0, y0] = line[0];
    const [x1, y1] = line[1];
    const minX = Math.min(x0, x1)
    const minY = Math.min(y0, y1)
    const maxX = Math.max(x0, x1)
    const maxY = Math.max(y0, y1)

    return { x0, y0, x1, y1, minX, minY, maxX, maxY }
}

const apply_y_line = (line) => {
    const { y0, minX, maxX } = getLineDetials(line);

    Array.from({ length: maxX - minX + 1 }).forEach((_, i) => {
        let y_cell = coordinates[y0]

        if (y_cell === undefined) {
            coordinates[y0] = { [minX + i]: 1 }
        } else {
            if (y_cell[minX + i] === 1) {
                sum.value += 1
            }
            y_cell[minX + i] = (y_cell[minX + i] || 0) + 1
        }
    })
}

const apply_x_line = (line) => {
    const { x0, minY, maxY } = getLineDetials(line);

    Array.from({ length: maxY - minY + 1 }).forEach((_, i) => {
        let y_cell = coordinates[minY + i]

        if (y_cell === undefined) {
            coordinates[minY + i] = { [x0]: 1 }
        } else {
            if (y_cell[x0] === 1) {
                sum.value += 1
            }
            y_cell[x0] = (y_cell[x0] || 0) + 1
        }
    })
}

if (require.main === module) {
    data
        .forEach(line => {
            const [x0, y0] = line[0];
            const [x1, y1] = line[1];

            if (y0 === y1) {
                apply_y_line(line)
            } else if (x0 === x1) {
                apply_x_line(line)
            }
        })

    // const _sum = Object.values(coordinates)
    //     .reduce((sum, cur) =>
    //         sum += Object.values(cur).filter(x => x > 1).length
    //         , 0)

    console.log(sum.value);
}

module.exports = {
    data,
    coordinates,
    sum,
    getLineDetials,
    apply_x_line,
    apply_y_line,
}
