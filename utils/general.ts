// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export function withDots(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function displayFullDate(date: Date) {
    const temp = new Date(date);
    return temp.toLocaleDateString() + ', ' + temp.toLocaleTimeString();
}
