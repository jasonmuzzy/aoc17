import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const lengths = inputs[0].split(part === 1 ? ',' : '').map(v => part === 1 ? parseInt(v) : v.charCodeAt(0)).concat(part === 1 ? [] : [17, 31, 73, 47, 23]);
    const numbers = [...Array(part === 1 && test ? 5 : 256).keys()];
    let pos = 0, skip = 0;
    for (let round = 0; round < (part === 1 ? 1 : 64); round++) {
        for (let len of lengths) {
            for (let i = 0; i < Math.floor(len / 2); i++) {
                const source = (pos + i) % numbers.length;
                const target = (pos + len - i - 1) % numbers.length;
                const temp = numbers[source];
                numbers[source] = numbers[target];
                numbers[target] = temp;
            }
            pos = (pos + len + skip++) % numbers.length;
        }
    }
    if (part === 1) return numbers[0] * numbers[1];
    else {
        const denses = [...Array(16).keys()].reduce((hashes, i) => {
            hashes.push(numbers.slice(i * 16, i * 16 + 16).reduce((p2, c2) => p2 ^ c2));
            return hashes;
        }, [] as number[]);
        return denses.reduce((hex, dense) => hex + dense.toString(16).padStart(2, '0'), '');
    }
}

run(__filename, solve);