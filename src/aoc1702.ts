import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    let answer = 0;
    answer = inputs.reduce((pv, cv) => {
        const nums = cv.split(/\s/).map(Number); // Split by single space, multiple spaces or tabs (mean!)
        if (part === 1) return pv + Math.max(...nums) - Math.min(...nums);
        else { // Find the two numbers that divide evenly and return the division result
            for (let [i, num] of nums.entries()) {
                for (let num2 of nums.slice(i + 1)) {
                    if (num % num2 === 0) return pv + num / num2;
                    else if (num2 % num === 0) return pv + num2 / num;
                }
            }
        }
        return pv;
    }, 0);
    return answer;
}

run(__filename, solve);