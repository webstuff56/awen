import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

// serve built frontend (after you run: npm run build)
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// simple health-check
app.get('/api/ping', (_req, res) => res.json({ message: 'pong' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


