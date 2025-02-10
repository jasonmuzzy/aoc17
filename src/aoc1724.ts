import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    const components = inputs.map(input => input.match(/\d+/g)!.map(Number));
    const strengths: number[][] = [];
    const stack: { next: number, bridge: number[][], components: number[][] }[] = [{ next: 0, bridge: [], components }];
    while (stack.length > 0) {
        const { next, bridge, components } = stack.pop()!;
        let found = false;
        for (let [i, [a, b]] of components.entries()) {
            if (a === next || b === next) {
                found = true;
                stack.push({ next: a === next ? b : a, bridge: bridge.concat([[a, b]]), components: components.filter((v, i2) => i2 !== i) });
            }
        }
        if (!found) {
            strengths.push([part === 1 ? 0 : bridge.length, bridge.reduce((pv, cv) => pv + cv[0] + cv[1], 0)]);
        }
    }
    return strengths.reduce(([pl, ps], [cl, cs]) => cl > pl || cl === pl && cs > ps ? [cl, cs] : [pl, ps])[1];
}

run(__filename, solve);