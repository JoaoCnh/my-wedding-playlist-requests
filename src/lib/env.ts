export function assertEnv(env: unknown, name: string): asserts env is string {
  if (!env) {
    throw new Error(`${name} is not defined!`);
  }
}
