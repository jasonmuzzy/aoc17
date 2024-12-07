import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let d = 0, garbage = false, count = 0;
    for (let group = inputs[0], i = 0; i < group.length; i++) {
        if (garbage) {
            if (group[i] === '>') garbage = false;
            else if (group[i] === '!') i++;
            else count++
        } else if (!garbage) {
            if (group[i] === '<') garbage = true;
            else if (group[i] === '{') d++;
            else if (group[i] === '}') answer += d--;
        }
    }
    return part === 1 ? answer : count;
}

run(__filename, solve);