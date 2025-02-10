import { run } from 'aoc-copilot';
import { DefaultMap } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    const STATES = { CLEAN: 0, WEAKENED: 1, INFECTED: 2, FLAGGED: 3 } as const; // enum workaround
    type State = typeof STATES[keyof typeof STATES];
    const nodes: DefaultMap<string, State> = new DefaultMap(
        inputs.map((row, y) =>
            row.split('')
                .map((cell, x) => [x, y, cell] as [number, number, string]))
            .flat()
            .filter(([x, y, cell]) => cell === '#')
            .map(([x, y]) => [`${x},${y}`, STATES.INFECTED]),
        STATES.CLEAN
    );

    // Direction
    const DIRECTIONS = { LEFT: 0, RIGHT: 1, AROUND: 2 } as const;
    type Direction = typeof DIRECTIONS[keyof typeof DIRECTIONS];
    let dx = 0, dy = -1;
    const turn = (direction: Direction) => {
        if (direction === DIRECTIONS.AROUND) {
            dx = -dx;
            dy = -dy;
        } else {
            if (dx === 0) {
                dx = direction === DIRECTIONS.LEFT ? dy : -dy;
                dy = 0;
            } else {
                dy = direction === DIRECTIONS.LEFT ? -dx : dx;
                dx = 0;
            }
        }
    }

    // Bursts
    let y = Math.floor(inputs.length / 2);
    let x = Math.floor(inputs[y].length / 2);
    let timesInfected = 0;
    for (let i = 0; i < (part === 1 ? 10_000 : 10_000_000); i++) {

        const xy = `${x},${y}`;
        const state = nodes.get(xy);

        if (state === STATES.CLEAN) {
            turn(DIRECTIONS.LEFT);
            if (part === 1) {
                nodes.set(xy, STATES.INFECTED);
                timesInfected++;
            } else {
                nodes.set(xy, STATES.WEAKENED);
            }
        } else if (state === STATES.WEAKENED) {
            nodes.set(xy, STATES.INFECTED);
            timesInfected++;
        } else if (state === STATES.INFECTED) {
            turn(DIRECTIONS.RIGHT);
            if (part === 1) {
                nodes.delete(xy);
            } else {
                nodes.set(xy, STATES.FLAGGED);
            }
        } else if (state === STATES.FLAGGED) {
            turn(DIRECTIONS.AROUND);
            nodes.set(xy, STATES.CLEAN);
        }

        x += dx;
        y += dy;

    }

    return timesInfected;
}

run(__filename, solve);