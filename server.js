import express from 'express';
import dotenv from 'dotenv';
import { runTests } from './services/tagService.js';
import postRouter from './routes/posts.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

//라우터 미들웨어 설정
app.use('/posts', postRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
});