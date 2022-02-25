import { Router } from "express";
import createQueueRouter from "./queue";

const router = Router();

router.use("/queue", createQueueRouter());

// temp endpoint
router.get("/", (req, res) => {
  console.log("req: ", req);
  res.send({ payload: "test!" });
});

export default router;
