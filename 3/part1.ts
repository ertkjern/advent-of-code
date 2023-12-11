import { readFile } from 'fs/promises';

interface Point {
    number: number;
    length: number;
    x: number;
    y: number;
    isValid: boolean;
}


const getPointCoordinates = (lines: string[]): Point[] => {
    var points: Point[] = [];
    for (const [y, line] of lines.entries()) {
        const pointsInLine = line.split('');
        var sequence = [];
        var x = 0;
        var count = 0;
        for (var point of pointsInLine) {
            const number = parseInt(point);
            if (!isNaN(number)) {
                if (sequence.length === 0) {
                    x = count;
                }
                sequence.push(number);
            }
            if (isNaN(number)) {
                if (sequence.length > 0) {
                    points.push({
                        number: +sequence.join(''),
                        length: sequence.length,
                        x,
                        y,
                        isValid: false
                    });
                    sequence = [];
                }
            }
            count++;
        }
        if(sequence.length > 0){
            points.push({
                number: +sequence.join(''),
                length: sequence.length,
                x,
                y,
                isValid: false
            });
        }
    }
    return points;
}


const isPointValid = (point: string) => {
    if ('.' === point) {
        return false;
    }
    if (!isNaN(parseInt(point))) {
        return false;
    }
    if (point === undefined) {
        return false;
    }
    return true;

}

const solve = async (filename?: string) => {
    const logRaw = await readFile(filename, { encoding: "utf8" });
    const lines = logRaw.split('\n');
    const logArray = []
    let coordinates: Point[] = [];

    for (var line of lines) {
        const points = line.split('');
        logArray.push(points);
    }
    coordinates = getPointCoordinates(lines);
    for (var coordinate of coordinates) {
        for (let index = 0; index < coordinate.length; index++) {
            var valids = [];
            var x = coordinate.x + index;
            var y = coordinate.y;
            if (logArray.length > y) {
                const rowBelow = logArray[y + 1] ?? [];
                valids.push(isPointValid(rowBelow[x] ?? undefined)); // below
                valids.push(isPointValid(rowBelow[x + 1] ?? undefined)); // below right
                valids.push(isPointValid(rowBelow[x - 1] ?? undefined)); // below left
            }
            if (y > 0) {
                const rowAbove = logArray[y - 1];
                valids.push(isPointValid(rowAbove[x] ?? undefined)); // above
                valids.push(isPointValid(rowAbove[x + 1] ?? undefined)); // above right
                valids.push(isPointValid(rowAbove[x - 1])); // above left
            }
            // check right side
            const row = logArray[y];
            valids.push(isPointValid(row[x + 1])); // right
            valids.push(isPointValid(row[x - 1])); // left
            // console.log(valids)
            // check if contains any valid items
            if (valids.includes(true)) {
                coordinate.isValid = true;
                break;

            }
        }
    }
    // find the sum of all numbers that are valid in coordinates
    return coordinates.filter(coordinate => coordinate.isValid).reduce((prev, current) => prev + current.number, 0);
}

const test = async () => {
    const result = await solve('test.txt');
    result === 4361 ? console.log('Test passed') : console.log('Test failed');
}

const soloution = async () => {
    const result = await solve('input.txt');
    console.log('Result', result); // 512794
}

test();
soloution()