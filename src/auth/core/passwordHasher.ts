'use server';

import { scrypt as _scrypt , randomBytes, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); // This must be a real function, not undefined

export async function hashPassword(password: string, salt: string) {
  const derivedKey = (await scrypt(password, salt, 64)) as Buffer;
  return derivedKey.toString("hex");
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword
} : {
  password: string,
  salt: string,
  hashedPassword: string
}) {
    const inputHashedPassword = await hashPassword(password,salt)
    return timingSafeEqual(
      Buffer.from(inputHashedPassword, "hex"),
      Buffer.from(hashedPassword, "hex")
    )
}

export async function generateSalt() {
  return randomBytes(16).toString("hex").normalize()
}