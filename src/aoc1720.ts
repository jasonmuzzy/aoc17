import { run } from 'aoc-copilot';

async function solve(inputs: string[], part: number, test: boolean, additionalInfo?: { [key: string]: string }): Promise<number | string> {
    if (part === 1) {

        // For part 1, we just need to identify the particle that will _eventually_ be closest to the
        // origin (0,0,0).  After sufficient time passes, the particle with the lowest total
        // acceleration will be closest and stay there for the rest of time since everything else will
        // continue to move away at an increasingly greater rate.
        return inputs.map((input, i) => {
            const [ax, ay, az] = [...input.matchAll(/-?\d+/g).map(Number)].slice(6);
            return { i, a: Math.abs(ax) + Math.abs(ay) + Math.abs(az) };
        }).reduce((min, particle) => particle.a < min.a ? particle : min).i;

    } else {

        // For part 2 we can use the Kinematics formula to calculate where particles will be at time
        // "t", and therefore if and when they'll collide: p(t) = p_0 + v_0 * t + 0.5 * a * t**2

        // Parse position, velocity and acceleration from the inputs
        // NOTE: the given velocity isn't usable -- we need to calculate adjusted velocity (possibly
        // because acceleration adjusts velocity before velocity adjusts position?).
        // We know position at time = 1 is initial position + initial velocity + acceleration, or:
        //   p(1) = p_0 + v_0 + a
        // So we can solve for v_adj as:
        //   p_0 + v_0 + a = p_0 + v_adj * 1 + 0.5 * a * 1**2
        // Eliminate and rearrange:
        //   v_adj = v_0 + 0.5 * a
        const particles = new Map(inputs.map((input, i) => {
            const [px, py, pz, vx, vy, vz, ax, ay, az] = input.matchAll(/-?\d+/g).map(Number);
            return [i, { i, px, py, pz, vx: vx + 0.5 * ax, vy: vy + 0.5 * ay, vz: vz + 0.5 * az, ax, ay, az }];
        }));

        const times: Map<number, Set<number>> = new Map();

        const ps = [...particles.values()];
        for (let i1 = 0; i1 < ps.length; i1++) {
            for (let i2 = i1 + 1; i2 < ps.length; i2++) {

                // Check if two particles are at the same x position at the same time by setting them
                // equal to each other and rearranging into the quadratic form ax**2 + bx + c = 0 and
                // solving for t:
                //   p1_0 + v1_adj * t + 0.5 * a1 * t**2 = p2_0 + v2_adj * t + 0.5 * a2 * t**2
                // Rearrange (showing (a), (b) and (c) groups):
                //   (0.5 * a1 - 0.5 * a2) * t**2 + (v1_adj - v2_adj) * t + (p1_0 - p2_0) = 0
                const a = 0.5 * ps[i1].ax - 0.5 * ps[i2].ax;
                const b = ps[i1].vx - ps[i2].vx;
                const c = ps[i1].px - ps[i2].px;
                let t1 = -1, t2 = -1;

                if (a === 0) { // Special case, solve linear equation
                    // Linear equation: bx + c = 0
                    if (b !== 0) {
                        t1 = -c / b;
                    }
                } else { // Quadratic
                    const D = b ** 2 - 4 * a * c; // Discriminant
                    if (D >= 0) {
                        t1 = ((-b) + Math.sqrt(D)) / (2 * a);
                        if (D > 0) {
                            t2 = ((-b) - Math.sqrt(D)) / (2 * a);
                        }
                    }
                }

                // Now just check if they also collide on the y and z axis
                const check = (i1: number, i2: number, t: number) => {
                    if (t >= 0) {
                        const y1 = ps[i1].py + ps[i1].vy * t + 0.5 * ps[i1].ay * t**2;
                        const y2 = ps[i2].py + ps[i2].vy * t + 0.5 * ps[i2].ay * t**2;
                        if (y1 === y2) {
                            const z1 = ps[i1].pz + ps[i1].vz * t + 0.5 * ps[i1].az * t**2;
                            const z2 = ps[i2].pz + ps[i2].vz * t + 0.5 * ps[i2].az * t**2;
                            if (z1 === z2) {
                                times.set(t, (times.get(t) ?? new Set()).add(i1));
                                times.set(t, times.get(t)!.add(i2));
                                return true;
                            }
                        }
                    }
                    return false;
                }
                check(i1, i2, Math.min(t1, t2)) || check(i1, i2, Math.max(t1, t2));

            }
        }

        // Eliminate particles in time order so that particles that collide earlier don't exist to
        // collide with other particles later.  NOTE: this only consider all particles that collide at
        // a given time, not whether they collide with each other.  If one group of particles collided
        // in one spot and another group in another spot but all at the same time, this could break;
        for (let [_, is] of [...times.entries()].sort((a, b) => a[0] - b[0])) {
            for (let i of [...is]) {
                if (!particles.has(i)) is.delete(i);
            }
            if (is.size > 1) { // There must be at least 2 particles left to collide
                is.forEach(i => particles.delete(i));
            }
        }

        return particles.size;

    }
}

run(__filename, solve);