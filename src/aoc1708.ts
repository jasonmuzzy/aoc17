import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const instructions = inputs.map(input => input.split(' ').filter((v, i) => i !== 3).map((v, i) => i === 2 || i === 5 ? parseInt(v) : v)) as [string, string, number, string, string, number][];
    const registers: Map<string, number> = new Map(instructions.map(i => [i[0], 0]));
    let max = -Infinity;
    for (let [t, op, v, l, comp, r] of instructions) {
        if ((comp === '==' && registers.get(l)! === r) ||
            (comp === '!=' && registers.get(l)! !== r) ||
            (comp === '>' && registers.get(l)! > r) ||
            (comp === '>=' && registers.get(l)! >= r) ||
            (comp === '<' && registers.get(l)! < r) ||
            (comp === '<=' && registers.get(l)! <= r)
        ) {
            registers.set(t, registers.get(t)! + (op === 'inc' ? v : -v));
            max = Math.max(max, ...registers.values());
        }
    }
    return part === 1 ? Math.max(...registers.values()) : max;
}

run(__filename, solve);