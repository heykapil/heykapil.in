import { randomHex } from './randomHex';
export function generateSession() {
  const date = Date.now().valueOf();
  const timehex = date.toString(16);
  const rand = randomHex(6);
  return `id_` + timehex + rand;
}
