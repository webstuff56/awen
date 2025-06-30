// Wall.jsx (with text box, Inspire button, and Claude's fixes)
import React, { useState } from 'react';
import './App.css';

function Wall() {
  const [text, setText] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError('');
    setPoem('');

    try {
      const res = await fetch('/api/poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Poem request failed');
      setPoem(data.poem || 'No poem returned.');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wall-container">
      <h2>Write to Awen</h2>
      <form onSubmit={handleSubmit} className="wall-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Speak your heart..."
          rows={6}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Listening...' : 'Inspire'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {poem && (
        <div className="poem-output">
          <pre>{poem}</pre>
          {/* Future: <audio controls src="..." /> */}
        </div>
      )}
    </div>
  );
}

export default Wall;

