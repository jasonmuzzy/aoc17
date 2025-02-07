import { run } from 'aoc-copilot';
import { DefaultMap } from 'aoc-copilot/dist/utils';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    const programs: { registers: DefaultMap<string, number>, pointer: number, sent: number }[] = [];
    for (let pid = 0; pid < part; pid++) {
        programs.push({ registers: new DefaultMap([['p', pid]], 0), pointer: 0, sent: 0 });
    }
    const queue: [number[], number[]] = [[], []];
    do {
        for (let [pid, program] of programs.entries()) {
            while (program.pointer >= 0 && program.pointer < inputs.length) {
                const [op, op1, op2 = ' '] = inputs[program.pointer].split(' ');
                const x = /[a-z]+/.test(op1) ? program.registers.get(op1) : parseInt(op1);
                const y = /[ a-z]+/.test(op2) ? program.registers.get(op2) : parseInt(op2);
                if (op === 'snd') {
                    queue[pid === 0 ? 1 : 0].push(x);
                    program.sent++;
                } else if (op === 'set') program.registers.set(op1, y);
                else if (op === 'add') program.registers.set(op1, x + y);
                else if (op === 'mul') program.registers.set(op1, x * y);
                else if (op === 'mod') program.registers.set(op1, x % y);
                else if (op === 'rcv' && (part === 2 || x !== 0)) {
                    if (part === 1 || queue[pid].length === 0) break;
                    else program.registers.set(op1, queue[pid].shift()!);
                } else if (op === 'jgz' && x > 0) program.pointer += y - 1;
                program.pointer++;
            }
        }
    } while (part === 2 && queue.flat().length > 0);
    return part === 1 ? queue[1][queue[1].length - 1] : programs[1].sent;
}

run(__filename, solve);