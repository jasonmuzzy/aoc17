import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const graph: Map<number, Set<number>> = new Map();
    for (let input of inputs) {
        const [node, ...neighbors] = (input.match(/\d+/g) ?? []).map(Number);
        for (let neighbor of neighbors) graph.set(node, (graph.get(node) ?? new Set()).add(neighbor));
    }
    const visited: Set<number> = new Set();
    let progs = [...Array(inputs.length).keys()], groups = 0;
    while (progs.length > 0) {
        groups++;
        const queue = [progs.pop()!];
        while (queue.length > 0) {
            const node = queue.pop()!;
            if (visited.has(node)) continue;
            visited.add(node);
            progs = progs.filter(p => p !== node);
            if (!graph.has(node)) continue;
            for (let neighbor of graph.get(node)!) {
                queue.push(neighbor);
            }
        }
        if (part === 1) break;
    }
    return part === 1 ? visited.size : groups;
}

run(__filename, solve);