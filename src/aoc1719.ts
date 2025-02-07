import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let letters = '';
    let x = inputs[0].indexOf('|'), y = 0, dx = 0, dy = 1, steps = 0;
    while (y >= 0 && y < inputs.length && x >= 0 && x < inputs[y].length && inputs[y][x] !== ' ') {
        if (inputs[y][x] === '+') { // Corner
            if (dx === 0) { // Moving vertically
                dy = 0;
                dx = x === 0 || inputs[y][x - 1] === ' ' ? 1 : -1;
            } else { // Moving horizontally
                dx = 0;
                dy = y === 0 || inputs[y - 1][x] === ' ' ? 1 : -1;
            }
        } else if (/[A-Z]/.test(inputs[y][x])) letters += inputs[y][x];
        x += dx;
        y += dy;
        steps++;
    }
    return part === 1 ? letters : steps;
}

run(__filename, solve);