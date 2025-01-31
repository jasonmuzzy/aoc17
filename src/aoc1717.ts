import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let position = 0;
    const steps = parseInt(inputs[0]);
    let buffer = [0]; // linked list: buffer[i] = next i
    function insert(after: number) {
        const temp = buffer[after];
        buffer[after] = buffer.length;
        buffer.push(temp);
    }
    for (let value = 1; value <= (part === 1 ? 2017 : 50_000_000); value++) {
        for (let step = 0; step < steps; step++) {
            position = buffer[position];
        }
        insert(position);
        position = buffer[position];
    }
    return buffer[part === 1 ? 2017 : 0];
}

run(__filename, solve);