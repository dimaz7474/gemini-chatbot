// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Gemini setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Endpoint chat
app.post('/api/chat', async (req, res) => {
     console.log('Body:', req.body); // ← Tambahkan log ini
  const userPrompt = req.body.message;

  try {
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();
    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'Failed to get response from Gemini API' });
  }
});

app.listen(port, () => {
  console.log(`🚀 Gemini Chatbot running on http://localhost:${port}`);
});
