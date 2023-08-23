import { hashPassword, verifyPassword } from "../../../app/shared/util";
import { createUser, getUser } from "../../../app/data/data-access";
import { Request, Response } from "express";

export function registerUser(req: Request, res: Response) {
  const hashedPassword = hashPassword(req.body.password);

  const userData = {
    email: req.body.email,
    password: hashedPassword,
  };

  createUser(userData);

  return res.json({ message: "User registered!" });
}

export function loginUser(req: Request, res: Response) {
  const user = getUser(req.body.email);
  const passwordMatches = verifyPassword(req.body.password, user.password);

  if (user) {
    if (passwordMatches) {
      return res.json({ message: "User logged!" });
    } else {
      res.status(403).json({ message: "Invalid credentials!" });
    }
  } else {
    res.status(403).json({ message: "Invalid credentials!" });
  }
}
