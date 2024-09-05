import crypto from 'crypto';
export function randomHex(size?: number) {
  const MASK = 0x3d;
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '1234567890';
  const charset = `${NUMBERS}${LETTERS}${LETTERS.toUpperCase()}`.split('');
  const bytes = new Uint8Array(size || 8);
  crypto.getRandomValues(bytes);
  return bytes.reduce((acc, byte) => `${acc}${charset[byte & MASK]}`, '');
}
