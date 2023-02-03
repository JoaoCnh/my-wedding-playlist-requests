export function random(min: number, max: number): number {
  const difference = max - min;
  return Math.floor(Math.random() * difference) + min;
}
