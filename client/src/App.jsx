import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [poem, setPoem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPoem('');

    try {
      const response = await fetch('/api/poem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setPoem(data.poem || 'No poem received.');
    } catch (error) {
      console.error('Error generating poem:', error);
      setPoem('An error occurred while generating the poem.');
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>Awen</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something for Awen..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Send to Awen'}
        </button>
      </form>
      {poem && (
        <div className="poem-output">
          <h2>Your Poem</h2>
          <pre>{poem}</pre>
        </div>
      )}
    </div>
  );
}

export default App;

                                                                                                        






