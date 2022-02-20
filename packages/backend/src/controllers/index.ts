import { Router } from "express";
import { queueRouter } from "./queue";

const router = Router();

router.use("/queue", queueRouter);

// temp endpoint
router.get("/", (req, res) => {
  console.log("req: ", req);
  res.send({ payload: "test!" });
});

export default router;
