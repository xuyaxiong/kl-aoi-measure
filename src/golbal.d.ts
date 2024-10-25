type FixedLengthArray<T, N extends number> = [T, ...T[]] & { length: N };

type ThreeNumberArray = FixedLengthArray<number, 3>;
