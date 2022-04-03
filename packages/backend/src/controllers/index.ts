import { Router } from "express";
import createAdminRouter from "./admin";
import createAuthRouter from "./auth";
import createQueueRouter from "./queue";

const router = Router();

router.use("/queue", createQueueRouter());
router.use("/admin", createAdminRouter());
router.use("/auth", createAuthRouter());

// temp endpoint
router.get("/", (req, res) => {
  console.log("req: ", req);
  res.send({ payload: "test!" });
});

export default router;
