import Valkey from 'ioredis';
const serviceUri = process.env.REDIS_URL! as string;

export async function redis() {
  const valkey = new Valkey(serviceUri);
  return valkey;
}
