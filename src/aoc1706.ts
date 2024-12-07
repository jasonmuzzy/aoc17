import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const registers = inputs[0].split(/\s/g).map(Number);
    const history: Map<string, [number, number]> = new Map();
    for (let i = 0; true; i++) {
        const signature = registers.join(',');
        const [count, lastSeen] = history.get(signature) ?? [0, i];
        if (part === count) return i - (part === 1 ? 0 : lastSeen);
        history.set(signature, [count + 1, i]);
        const [j, v] = registers.map((v, i) => [i, v]).reduce((pv, cv) => cv[1] > pv[1] ? cv : pv);
        registers[j] = 0;
        for (let k = 1; k <= v; k++) {
            registers[(j + k) % registers.length]++;
        }
    }
}

run(__filename, solve);