import { randomBytes } from 'crypto';

export const random = () => {
  return randomBytes(123).toString('base64');
}
