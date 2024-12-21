import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let max = -Infinity;
    const totals = inputs[0].split(',').reduce((pv, cv) => (pv[cv]++, pv), { n: 0, ne: 0, se: 0, s: 0, sw: 0, nw: 0 } as { [key: string]: number });
    if (part === 1) optimize();
    else {
        for (let key of Object.keys(totals)) totals[key] = 0; // Reset to 0
        for (let move of inputs[0].split(',')) {
            totals[move]++;
            optimize();
            max = Math.max(max, Object.values(totals).reduce((pv, cv) => pv + cv, 0));
        }
    }
    return part === 1 ? Object.values(totals).reduce((pv, cv) => pv + cv, 0) : max;
    function cancel(d1: string, d2: string) {
        const min = Math.min(totals[d1], totals[d2]);
        totals[d1] -= min;
        totals[d2] -= min;
    }
    function convert(d1: string, d2: string, d3: string) {
        const min = Math.min(totals[d1], totals[d2]);
        totals[d1] -= min;
        totals[d2] -= min;
        totals[d3] += min;
    }
    function optimize() {
        cancel('n', 's');
        cancel('ne', 'sw');
        cancel('nw', 'se');
        convert('se', 'sw', 's');
        convert('ne', 'nw', 'n');
        convert('ne', 's', 'se');
        convert('nw', 's', 'sw');
        convert('se', 'n', 'ne');
        convert('sw', 'n', 'nw');
    }
}

run(__filename, solve);