/**
 * Awen – backend server
 * Uses:
 *  • express / cors / body-parser  (as before)
 *  • dotenv                        (loads OPENAI_API_KEY from .env)
 *  • openai                        (calls GPT-4o for poetic responses)
 */

require("dotenv").config(); // <-- loads .env

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // must be set in .env
});

const app = express();

/* ─── Middleware ──────────────────────────────────────────── */
app.use(cors());
app.use(bodyParser.json());

/* (optional) serve the static React build */
app.use(express.static(__dirname + "/client/dist"));

/* ─── API: Poem / Poetic Reflection ───────────────────────── */
app.post("/api/poem", async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    /* GPT-4o: decide whether to reply with a poem or poetic prose */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are Awen, a poetic muse who responds with either a poem or a poetic reflection based on what the user writes. Keep responses concise and emotionally resonant.",
        },
        { role: "user", content: text.trim() },
      ],
    });

    const poem = completion.choices[0].message.content.trim();
    return res.json({ poem });
  } catch (err) {
    console.error("OpenAI error → fallback stub:", err.message);

    /* graceful fallback so the user still gets something */
    const poem = `Here is a poem inspired by your entry:\n\n"${text}"\n\n– Awen`;
    return res.json({
      poem,
      note: "OpenAI request failed – served fallback response.",
    });
  }
});

/* ─── Start Server ─────────────────────────────────────────── */
const PORT = process.env.PORT || 3000; // match front-end proxy / Nginx later
app.listen(PORT, () => console.log(`Awen backend running on port ${PORT}`));




