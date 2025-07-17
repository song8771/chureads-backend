import express from 'express';
import dotenv from 'dotenv';

import postRouter, { init } from './routes/posts.js';
import { connectDB } from './database/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//라우터 미들웨어 설정
app.use('/posts', postRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  const db = await connectDB();
  init(db);
});