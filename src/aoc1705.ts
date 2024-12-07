import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const msgs = inputs.map(Number);
    for (let pointer = 0; pointer < msgs.length; pointer += (part === 1 || msgs[pointer] < 3 ? msgs[pointer]++ : msgs[pointer]--), answer++) {}
    return answer;
}

run(__filename, solve);