import { Router, Response } from "express";
import { authenticate, AuthenticatedRequest } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req: AuthenticatedRequest, res: Response) => {
  return res.json({
    message: "Protected route works",
    user: req.user,
  });
});

export default router;