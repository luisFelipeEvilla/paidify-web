// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
export function withDots(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
