export const WEEKS = Array.from({length: 52}, (x, i) => i);

export const RANGES = [
    { min: -10, max: -5 },
    { min: -7, max: -4 },
    { min: -4, max: 3 },
    { min: 2, max: 11 },
    { min: 9, max: 20 },
    { min: 12, max: 23 },
    { min: 15, max: 25 },
    { min: 14, max: 23 },
    { min: 8, max: 16 },
    { min: 3, max: 9 },
    { min: -1, max: 3 },
    { min: -1, max: -5 },
];

const getRandomArbitrary = (min: number, max: number) => {
    return Math.ceil(Math.random() * (max - min) + min);
}

export const getTemperature = () => WEEKS.reduce((result, week) => {
    const month = Math.floor(week / 4.3);
    const range = RANGES[month];
    
    result.current.push(getRandomArbitrary(range.min, range.max));
    result.history.push(getRandomArbitrary(range.min, range.max));
    return result;
}, {
    current: [] as number[],
    history: [] as number[],
});