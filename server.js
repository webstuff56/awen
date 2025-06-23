/**
 * Awen – backend server (ESM)
 * Uses:
 *  • express / cors / body-parser  (as before)
 *  • dotenv/config                 (loads OPENAI_API_KEY from .env)
 *  • openai                        (calls GPT‑4o for poetic responses)
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in .env
});

const app = express();
/* ─── Middleware ──────────────────────────────────────────── */
app.use(cors());
app.use(bodyParser.json());

/* (optional) serve the static React build */
app.use(express.static(`${process.cwd()}/client/dist`));

/* ─── API: Poem / Poetic Reflection ───────────────────────── */
app.post('/api/poem', async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content:
            'You are Awen, a poetic muse who responds with either a poem or a poetic reflection based on what the user writes. Keep responses concise and emotionally resonant.',
        },
        { role: 'user', content: text.trim() },
      ],
    });

    const poem = completion.choices[0].message.content.trim();
    return res.json({ poem });
  } catch (err) {
    console.error('OpenAI error → fallback stub:', err.message);

    const poem = `Here is a poem inspired by your entry:\n\n"${text}"\n\n– Awen`;
    return res.json({
      poem,
      note: 'OpenAI request failed – served fallback response.',
    });
  }
});

/* ─── Start Server ─────────────────────────────────────────── */
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () =>
  console.log(`Awen backend running on http://0.0.0.0:${PORT}`),
);






