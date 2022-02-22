// console.log()
declare function consoleLog(message: string): void;
export function log(message: string): void {
  consoleLog(message);
}

// console.time()
declare function consoleTime(label: string): void;
export function time(label: string): void {
  consoleTime(label);
}

// console.timeEnd()
declare function consoleTimeEnd(label: string): void;
export function timeEnd(label: string): void {
  consoleTimeEnd(label);
}
