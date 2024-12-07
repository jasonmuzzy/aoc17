import { run } from 'aoc-copilot';

async function solve([...inputs]: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    if (part === 2) inputs = inputs.map(input => input.split(' ').map(word => word.split('').sort().join('')).join(' ')); // no anagrams
    return inputs.filter(passphrase => passphrase.split(' ').length === passphrase.split(' ').filter((word, i, a) => i === a.indexOf(word)).length).length; // no repeated words
}

run(__filename, solve);