import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * This method is used to verify the password hash
 * @param password 
 * @param hash 
 * @returns {Promise<boolean>}
 */
export const verifyPasswordhash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
}


export const hashPassword = async (password: string) => {
  const saltRound = await bcrypt.genSalt(10);
  return await bcrypt.hash(password,saltRound)
}