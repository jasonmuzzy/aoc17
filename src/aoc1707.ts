import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const programs: { [key: string]: { weight: number, subs: string[], total: number } } = {};
    for (let input of inputs) {
        const [name, weight, ...subs] = input.match(/([a-z]+|\d+)/g)!;
        programs[name] = { weight: parseInt(weight), subs, total: 0 };
    }
    const root = Object.keys(programs).find(name => Object.values(programs).every(({ subs }) => !subs.includes(name))) ?? '';
    if (part === 1) return root;
    else {
        let answer = 0;
        const recurse = (name: string): number => {
            if (answer !== 0) return answer; // Short-cut recursion once answer is found
            programs[name].total = programs[name].subs.reduce((pv, cv) => pv + recurse(cv), programs[name].weight);
            const weights = [...programs[name].subs.reduce((pv, cv) => {
                pv.set(programs[cv].total, (pv.get(programs[cv].total) ?? []).concat([cv]));
                return pv;
            }, new Map() as Map<number, string[]>)].sort((a, b) => a[1].length - b[1].length);
            if (weights.length > 1 && answer === 0) answer = programs[weights[0][1][0]].weight - weights[0][0] + weights[1][0];
            return answer !== 0 ? answer : programs[name].total;
        }
        return recurse(root); // Find smallest branch not balanced with siblings
    }
}

run(__filename, solve);