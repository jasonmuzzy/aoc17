import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = test ? 'abcde' : 'abcdefghijklmnop';
    const moves = inputs[0].split(',');
    function swap(a: number, b: number) {
        return answer.substring(0, a)
            + answer.substring(b, b + 1)
            + answer.substring(a + 1, b)
            + answer.substring(a, a + 1)
            + answer.substring(b + 1);
    }
    for (let dance = 1; dance <= (part === 1 ? 1 : 1_000_000_000); dance++) {
        for (let move of moves) {
            if (move.startsWith('s')) { // spin
                const places = parseInt(move.substring(1));
                answer = answer.substring(answer.length - places) + answer.substring(0, answer.length - places);
            } else if (move.startsWith('x')) { // exchange
                const [a, b] = [...move.matchAll(/\d+/g).map(Number)].toSorted((a, b) => a - b);
                answer = swap(a, b);
            } else { // partner
                const [a, b] = [answer.indexOf(move.substring(1, 2)), answer.indexOf(move.substring(3, 4))].toSorted((a, b) => a - b);
                answer = swap(a, b);
            }
        }
        if (answer === 'abcdefghijklmnop') { // Returns the original every 60 dances
            dance = dance * Math.floor(1_000_000_000 / dance);
        }
    }
    return answer;
}

run(__filename, solve);