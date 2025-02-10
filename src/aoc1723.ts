import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {

    let a = part - 1, b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0, count = 0;

    /* 0 */ b = 81;
    /* 1 */ c = b;
    /* 2 */ if (a !== 0) { // part 2
        /* 4 */ b *= 100;
        /* 5 */ b += 100000;
        /* 6 */ c = b;
        /* 7 */ c += 17000;
    }
    /* 3 jnz 1 5 */
    do {
        /* 8 */ f = 1;
        /* 9 */ d = 2;
        do {
            /* 10 */ e = 2;
            do {
                /* 11 */ g = d;
                /* 12 */ g *= e; count++;
                /* 13 */ g -= b;
                /* 14 */ if (g !== 0) {}
                /* 15 */ else f = 0;
                /* 16 */ e++;
                /* 17 */ g = e;
                /* 18 */ g -= b;
                /* 19 jnz g -8 */
                if (part === 2 && (f === 0 || d * e > b)) break;
            } while (g !== 0);
            /* 20 */ d++;
            /* 21 */ g = d;
            /* 22 */ g -= b;
            /* 23 jnz g -13 */
            if (part === 2 && f === 0) break;
        } while (g !== 0);
        /* 24 */ if (f !== 0) {}
        /* 25 */ else h++;
        /* 26 */ g = b;
        /* 27 */ g -= c;
        /* 28 */ if (g !== 0) {}
        /* 29 */ else break;
        /* 30 */ b += 17;
        /* 31 jnz 1 -23 */ 
    } while (true);

    return part === 1 ? count : h;
}

run(__filename, solve);