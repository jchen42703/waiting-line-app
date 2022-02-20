import { Router } from 'express';
import authRouter from './auth';
import queueRouter from './queue';

const router = Router();

router.use('/queue', queueRouter);
router.use('/auth', authRouter);

// temp endpoint
router.get('/', (req, res) => {
  console.log('req: ', req);
  res.send({ payload: 'test!' });
});

export default router;
