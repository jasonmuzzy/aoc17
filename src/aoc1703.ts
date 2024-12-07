import { run } from 'aoc-copilot';
import { adjacents } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const n = parseInt(inputs[0]);
    const sqrt = Math.ceil(Math.sqrt(n)); // perfect square >= n
    const grid: number[][] = [];
    for (let y = 0; y < sqrt; y++) { // Prefill the grid with 0's
        grid.push(Array(sqrt).fill(0));
    }
    const cx = Math.ceil(sqrt / 2) - 1; // center x
    const cy = Math.ceil((sqrt + 1) / 2) - 1; // center y
    if (part === 1) { // Fancy formula for part 1, what a waste of time...
        const sq = sqrt ** 2;
        const x = sq - n < sqrt
            ? sq % 2 === 0 ? sq - n + 1 : sqrt + n - sq
            : sq % 2 === 0 ? sqrt : 1;
        const y = sq - n < sqrt
            ? sq % 2 === 0 ? 1 : sqrt
            : sq % 2 === 0 ? sq - n - sqrt + 2 : 2 * sqrt + n - sq - 1;
        const d = Math.abs(cx + 1 - x) + Math.abs(cy + 1 - y);
        answer += d;
    } else { // Couldn't figure out a fancy formula for part 2, so I just filled the spiral (but OEIS knows about it: https://oeis.org/A141481)
        grid[cy][cx] = 1;
        for (let x = cx, y = cy, d = 'r', m = 2; m <= n; m++) { // Fill the spiral
            x += d === 'r' ? 1 : d === 'l' ? -1 : 0;
            y += d === 'd' ? 1 : d === 'u' ? -1 : 0;
            m = adjacents(x, y, sqrt, sqrt, true).reduce((pv, [x1, y1]) => pv + grid[y1][x1], 0);
            if (m >= n) {
                answer = m;
                break;
            }
            grid[y][x] = m;
            if (d === 'r' && grid[y - 1][x] === 0) d = 'u';
            else if (d === 'l' && grid[y + 1][x] === 0) d = 'd';
            else if (d === 'd' && grid[y][x + 1] === 0) d = 'r';
            else if (d === 'u' && grid[y][x - 1] === 0) d = 'l';
        }
    }

    return answer;
}

run(__filename, solve);