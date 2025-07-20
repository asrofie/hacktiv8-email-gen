import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_API_KEY;
const client = new GoogleGenerativeAI(apiKey);
const model = client.getGenerativeModel({
  model: 'gemini-1.5-flash',
  temperature: 0,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    let emailPrompt =
    "Write an email with topic: " + prompt + "\n";
    "Keep all Markdown syntax, formatting, and tags exactly as they are\n" +
    "Use <br> for line break\n" +
    "Return only rewriten string no explanation, NO subject sugestion\n";
    const result = await model.generateContent(emailPrompt);
    const response = result.response.text();
    res.json({ response: response });
  } catch (error) {
    console.error('Error generating text:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});