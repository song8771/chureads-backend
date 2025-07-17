import express from 'express';
import dotenv from 'dotenv';
import { runTests } from './services/tagService.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
  runTests();
});