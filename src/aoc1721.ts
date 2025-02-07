import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    const rotated = (arr: string[]) => {
        const result: string[] = [];
        for (let x = 0; x < arr[0].length; x++) {
            let row = '';
            for (let y = arr.length - 1; y >= 0; y--) {
                row += arr[y][x];
            }
            result.push(row);
        }
        return result;
    }

    const flipped = (arr: string[]) => {
        return arr.map(row => [...row].toReversed().join(''));
    }

    const rotations = (str: string) => {
        let arr = str.split('/');
        const results = new Set([str, flipped(arr).join('/')]);
        for (let i = 0; i < 3; i++) {
            arr = rotated(arr);
            results.add(arr.join('/'));
            results.add(flipped(arr).join('/'));
        }
        return [...results];
    }

    const rules: Map<string, string> = new Map();
    inputs.forEach(input => {
        const [lhs, rhs] = input.split(' => ');
        rotations(lhs).forEach(rotation => rules.set(rotation, rhs));
    });
    let pixels = '.#./..#/###';
    for (let i = 0; i < (part === 2 ? 18 : test ? 2 : 5); i++) {
        const rows = pixels.split('/');
        const grid: string[][] = [];
        if (rows.length % 2 === 0) {
            for (let y = 0; y < rows.length; y += 2) {
                const row: string[] = [];
                for (let x = 0; x < rows[y].length; x += 2) {
                    row.push(rows[y + 0][x] + rows[y + 0][x + 1] + '/' +
                        rows[y + 1][x] + rows[y + 1][x + 1]);
                }
                grid.push(row);
            }
        } else {
            for (let y = 0; y < rows.length; y += 3) {
                const row: string[] = [];
                for (let x = 0; x < rows[y].length; x += 3) {
                    row.push(rows[y + 0][x] + rows[y + 0][x + 1] + rows[y + 0][x + 2] + '/' +
                        rows[y + 1][x] + rows[y + 1][x + 1] + rows[y + 1][x + 2] + '/' +
                        rows[y + 2][x] + rows[y + 2][x + 1] + rows[y + 2][x + 2]);
                }
                grid.push(row);
            }
        }
        pixels = '';
        for (let row of grid) {
            const row2: string[] = [];
            for (let cell of row) {
                const match = rules.get(cell);
                if (match) row2.push(match);
            }
            while (row2[0] !== '') {
                for (let i2 = 0; i2 < row2.length; i2++) {
                    const i = row2[i2].indexOf('/');
                    pixels += i === -1 ? row2[i2] : row2[i2].substring(0, i);
                    row2[i2] = i === -1 ? '' : row2[i2].substring(i + 1);
                }
                pixels += '/';
            }
        }
        pixels = pixels.substring(0, pixels.length - 1); // Get rid of last /

    }

    return pixels.replaceAll(/\.|\//g, '').length;
}

run(__filename, solve);