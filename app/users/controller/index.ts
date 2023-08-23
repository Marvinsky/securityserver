import {
  createToken,
  hashPassword,
  verifyPassword,
} from "../../../app/shared/util";
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

  if (user) {
    const passwordMatches = verifyPassword(req.body.password, user.password);
    if (passwordMatches) {
      const jwt = createToken(user);

      return res.json({ message: "User logged!", access_token: jwt });
    } else {
      res.status(403).json({ message: "Invalid credentials!" });
    }
  } else {
    res.status(403).json({ message: "Invalid credentials!" });
  }
}
