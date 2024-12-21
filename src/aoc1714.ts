import { run } from 'aoc-copilot';
import { adjacents, csv, xyArray } from 'aoc-copilot/dist/utils';

import { hash } from './knothash';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const disk: string[][] = [];
    for (let y = 0; y < 128; y++) {
        const lengths = `${inputs[0]}-${y}`.split('').map(v => v.charCodeAt(0));
        const knot = hash(lengths) as string;
        const bits = knot.split('').map(k => parseInt(k, 16).toString(2).padStart(4, '0')).join('');
        if (part === 1) answer += bits.replaceAll('0', '').length;
        else disk.push(bits.split(''));
    }
    if (part === 2) {
        const visiteds: Set<string> = new Set();
        for (let [x, y] of xyArray(disk)) {
            if (disk[y][x] === '0' || visiteds.has(csv(x, y))) continue;
            answer++; // New group
            const stack: [number, number][] = [[x, y]];
            while (stack.length > 0) {
                const [x1, y1] = stack.pop()!;
                visiteds.add(csv(x1, y1));
                for (let [nx, ny] of adjacents(x1, y1, disk[y1].length, disk.length)) {
                    if (disk[ny][nx] === '0' || visiteds.has(csv(nx, ny))) continue;
                    stack.push([nx, ny]);
                }
            }
        }
    }
    return answer;
}

run(__filename, solve);