import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await AuthService.register(email, password);
    return res.status(201).json(user);
  } catch (err: any) {
    if (err.message === "EMAIL_IN_USE") {
      return res.status(400).json({ message: "Email already in use" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const tokens = await AuthService.login(email, password);
    return res.json(tokens);
  } catch (err: any) {
    if (err.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};