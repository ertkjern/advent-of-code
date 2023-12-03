const fs = require("node:fs/promises");

const solve1 = async (fileName) => {
    const dataToDecode = (await fs.readFile(fileName, { encoding: "utf8" })).split("\n");
    // for each line in the date find the numbrs and concatinate them into one single number
    const numbers = dataToDecode.map((line) => {
        const numbers = line.match(/\d+/g);
        return numbers;
    }).map((numbers) => numbers.join('').replace(/\s/g, ''));
    const sumEachLine = numbers.map((number) => {
        const firstNumber = number.toString().charAt(0);
        const lastNumber = number.toString().charAt(number.length - 1);
        return +(firstNumber.toString() + lastNumber.toString());
    });
    console.log('result 1', sumEachLine.reduce((acc, curr) => acc + curr, 0));

}

solve1('data.txt');

const solve2 = async (fileName) => {
    const input = (await fs.readFile(fileName, { encoding: "utf8" })).toString()
    const lines = input.split('\n');
    const result = [];
    const numbers = Object.keys(numberMapping);
    for(let line of lines) {
        let lineResult = [];
        for(let number of numbers) {
            const matches = [...line.matchAll(number)]
            matches.forEach((match) => {
                lineResult.push({ value: Number(numberMapping[number]), index: match.index });
            })
        }
        for (let i = 0; i < line.length; i++) {
            if (!isNaN(Number(line[i]))) {
                lineResult.push({ value: Number(line[i]), index: i });
            }
        }
        lineResult.sort((a, b) => a.index - b.index);
        var resultNumber = Number(lineResult[0].value.toString() + lineResult[lineResult.length - 1].value.toString());
        result.push(resultNumber);
    }
    console.log('result 2', result.reduce((acc, curr) => acc + curr, 0));
   
}

solve2('data.txt');



const numberMapping = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
}
