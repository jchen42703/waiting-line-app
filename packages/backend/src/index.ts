import express from 'express';
import cors from 'cors';
import { initMongoConnection } from './lib/db/mongodb';
import 'dotenv/config';
import router from './controllers';

// initializes the db connection pool
initMongoConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
