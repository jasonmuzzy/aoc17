import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    let next = inputs[0].substring(15, 16), position = 0;
    const tape: Set<number> = new Set();
    let [steps] = inputs[1].match(/\d+/g)?.map(Number) ?? [0];
    type Step = { v: number, d: string, s: string };
    const states: Map<string, { 0: Step, 1: Step }> = new Map();
    for (let i = 3; i < inputs.length; i += 10) {
        states.set(inputs[i].substring(9, 10), { 
            0: { 
                v: parseInt(inputs[i + 2].substring(22, 23)),
                d: inputs[i + 3].substring(27, 28),
                s: inputs[i + 4].substring(26, 27)
            },
            1: { 
                v: parseInt(inputs[i + 6].substring(22, 23)),
                d: inputs[i + 7].substring(27, 28),
                s: inputs[i + 8].substring(26, 27)
            }
        });
    }
    for (let step = 0; step < steps; step++) {
        const state = states.get(next);
        if (state !== undefined) {
            const v = tape.has(position) ? 1 : 0;
            if (state[v].v === 0) tape.delete(position);
            else tape.add(position);
            position += state[v].d === 'l' ? -1 : 1;
            next = state[v].s;
        }
    }
    return tape.size;
}

run(__filename, solve);