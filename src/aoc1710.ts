import { run } from 'aoc-copilot';
import { hash } from './knothash';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const lengths = inputs[0].split(part === 1 ? ',' : '').map(v => part === 1 ? parseInt(v) : v.charCodeAt(0));
    return hash(lengths, part, test);
}

run(__filename, solve);