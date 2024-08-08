import crypto from 'crypto';
export function generateState() {
  const shuffle = (str: any) =>
    [...str].sort(() => Math.random() - 0.5).join('');
  const timehex = crypto
    .createHash('md5')
    .update(new Date().valueOf().toString(16))
    .digest('hex');
  const rand = crypto.randomBytes(16).toString('hex').toUpperCase();
  return shuffle(timehex + rand);
}
