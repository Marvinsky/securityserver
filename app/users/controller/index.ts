import { createUser, getUser } from "../../../app/data/data-access";
import { Request, Response } from "express";

export function registerUser(req: Request, res: Response) {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  createUser(userData);

  return res.json({ message: "User registered!" });
}

export function loginUser(req: Request, res: Response) {
  const user = getUser(req.body.email);
  if (user) {
    return res.json({ message: "User logged!" });
  } else {
    res.status(403).json({ message: "Invalid credentials!" });
  }
}
