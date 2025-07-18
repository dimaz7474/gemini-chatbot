// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url'; // <- Tambahan penting untuk __dirname
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ✅ Setup __dirname agar bisa digunakan di ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Sajikan file statis dari folder "public"
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Tampilkan index.html saat mengakses "/"
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Setup Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// ✅ Endpoint Chat
app.post('/api/chat', async (req, res) => {
  const userPrompt = req.body.message;
  console.log('Body:', req.body);

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
