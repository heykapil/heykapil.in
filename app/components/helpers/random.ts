import crypto from 'crypto';
export function generateState() {
  const CHUNK_SIZE = 0x8000;
  const input = crypto.getRandomValues(new Uint8Array(32));
  const arr = [];
  for (let i = 0; i < input.byteLength; i += CHUNK_SIZE) {
    arr.push(
      // @ts-ignore
      String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)),
    );
  }
  return btoa(
    arr.join('').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_'),
  );
}
