import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  return bcrypt.hashSync(rawPassword, 10);
}

export async function decodePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
