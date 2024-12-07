import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    return inputs[0].split('').reduce((pv, cv, i, a) => pv + (cv === a[part === 2 ? (i + a.length / 2) % a.length : i === 0 ? a.length - 1 : i - 1] ? parseInt(cv) : 0), 0);
}

run(__filename, solve);