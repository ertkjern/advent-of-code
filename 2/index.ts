const fs = require("node:fs/promises");

interface Bag {
    id: number;
    red: number
    green: number
    blue: number
    valid: boolean;
}

const totalColors = {
    red: 12,
    green: 13,
    blue: 14,
}

const isValidBag = (bag: Bag) => {
    if (bag.red > totalColors.red || bag.green > totalColors.green || bag.blue > totalColors.blue) {
        bag.valid = false;
    }
    else{
        bag.valid = true;
    }
    return bag;
}

const resetColors = (bag: Bag) => {
    return {
        ...bag,
        red: 0,
        green: 0,
        blue: 0,
        valid: false
    };
}

const solve = async (filename: string) => {
    const logRaw = await fs.readFile(filename, { encoding: "utf8" });
    const log = logRaw.split('\n');
    let bags: Bag[] = [];
    log.forEach((line: string) => {
        var bag: Bag = {
            id: -1,
            red: 0,
            green: 0,
            blue: 0,
            valid: false
        };
        // get id
        line = line.replace('Game ', '');
        // if it does not match its an error anyways
        // @ts-ignore
        bag.id = parseInt(line.match(/\d+/)[0]);
        line = line.replace(bag.id.toString() + ':', '');

        // get colors
        const round = line.split(/[;]/);
        for (let color of round) {
            const colors = color.split(',');
            colors.forEach((color: string) => {
                color = color.trim();
                const colorSplit = color.split(' ');
                const colorName = colorSplit[1];
                const colorCount = parseInt(colorSplit[0]);
                // @ts-ignore
                bag[colorName] = colorCount;
            }); 
            bag = isValidBag(bag);
            if(!bag.valid){
                break;
            }
        }
        bags.push(bag);

    });
    // console.log(bags.filter(bag => bag.valid));
    return bags.filter(bag => bag.valid).reduce((acc, bag) => acc + bag.id, 0);

}

const test1 = async () => {
    const result = await solve('test-data.txt');
    result === 8 ? console.log('test part 1: success') : console.error('test part 1: fail');
}

const soloution1 = async () => {
    const result = await solve('data.txt');
    console.log('result', result);
}

test1();
soloution1()

const solve2 = async (filename: string) => {
    const logRaw = await fs.readFile(filename, { encoding: "utf8" });
    const log = logRaw.split('\n');
    let bags: Bag[] = [];
    log.forEach((line: string) => {
        var bag = {
            id: -1,
            red: 0,
            green: 0,
            blue: 0,
            valid: false
        };
        const colorsMax = {
            red: 0,
            green: 0,
            blue: 0,
            valid: true
        };
        // get id
        line = line.replace('Game ', '');
        // if it does not match its an error anyways
        // @ts-ignore
        bag.id = parseInt(line.match(/\d+/)[0]);
        line = line.replace(bag.id.toString() + ':', '');
        // get colors
        const round = line.split(/[;]/);
        for (let color of round) {
            const colors = color.split(',');
            colors.forEach((color) => {
                color = color.trim();
                const colorSplit = color.split(' ');
                const colorName = colorSplit[1];
                const colorCount = parseInt(colorSplit[0]);
                // @ts-ignore
                bag[colorName] = colorCount;
            });
            for (let [color, number] of Object.entries(bag)) {
                //@ts-ignore
                if (number > colorsMax[color]) {
                    //@ts-ignore
                    colorsMax[color] = number;
                }
            }
        }
        // @ts-ignore
        bags.push(colorsMax);
    });
    return bags.map((colors) => {
        const power = Object.values(colors).reduce((a, b) => a * b);

        return power;
    })
    .reduce((a, b) => a + b);
}

const test2 = async () =>  {
    const result = await solve2('test-data.txt');
    result === 8 ? console.log('test part 2: success') : console.error('test part 1: fail');
}
const soloution2 = async () => {
    const result = await solve2('data.txt');
    console.log('result', result);
}

test2();
soloution2();

