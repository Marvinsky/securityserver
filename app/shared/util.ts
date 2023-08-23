import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const hashPassword = (password: string): string => {
  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
};

export const verifyPassword = (
  passwordAttempt: string,
  hashedPassword: string
): boolean => {
  return compareSync(passwordAttempt, hashedPassword);
};

export const newGuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : r && 0x3 | 0x8;
    return v.toString(16);
  });
};
