import {
  createToken,
  hashPassword,
  verifyPassword,
} from "../../../app/shared/util";
import { createUser, getUser } from "../../../app/data/data-access";
import { Request, Response } from "express";
import * as jwtDecode from "jwt-decode";

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
      const decodedJwt = jwtDecode.default<{ exp: string }>(jwt);

      return res.json({
        message: "User logged!",
        access_token: jwt,
        expires: decodedJwt.exp,
      });
    } else {
      res.status(403).json({ message: "Invalid credentials!" });
    }
  } else {
    res.status(403).json({ message: "Invalid credentials!" });
  }
}
