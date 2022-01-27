import { hash, compare } from 'bcryptjs';

export async function hashPassword(rawPassword) {
    const hashedPassword = await hash(rawPassword, 8);

    return hashedPassword;
}

export async function verifyPassword(rawPassword, hashedPassword) {
    const isValid = await compare(rawPassword, hashedPassword);

    return isValid;
}