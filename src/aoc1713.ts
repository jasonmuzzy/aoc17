import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const layers = inputs.map(input => input.split(': ').map(Number)) as [number, number][];
    for (let delay = 0, severity = 0, caught = false; true; delay++, caught = false) {
        for (let [depth, range] of layers) {
            if ((depth + delay) % ((range - 2) * 2 + 2) === 0) {
                severity += depth * range;
                caught = true;
                if (part === 2) break;
            }
        }
        if (part === 1) return severity;
        else if (part === 2 && !caught) return delay;
    }
}

run(__filename, solve);