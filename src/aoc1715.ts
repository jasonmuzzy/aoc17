import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let [a, b] = inputs.join('\n').matchAll(/\d+/g)?.map(Number);
    for (let pairs = 0; pairs < (part === 1 ? 40_000_000 : 5_000_000); pairs++) {
        do {
            a = a * 16807 % 2147483647;
        } while (part === 2 && a % 4 !== 0);
        do {
            b = b * 48271 % 2147483647;
        } while (part === 2 && b % 8 !== 0);
        if ((a & 0xFFFF) === (b & 0xFFFF)) answer++;
    }
    return answer;
}

run(__filename, solve, true);