import { Router } from "express";
import createAuthRouter from "./auth";
import createQueueRouter from "./queue";
import createSessionRouter from "./session";

const router = Router();

router.use("/queue", createQueueRouter());
router.use("/auth", createAuthRouter());
router.use("/session", createSessionRouter());

export default router;
