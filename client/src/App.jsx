import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [poem, setPoem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setPoem(data.poem);
    } catch (error) {
      console.error('Error generating poem:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem' }}>Awen</h1>
      <p style={{ fontSize: '1.2rem' }}>
        Write your thoughts below and receive a poem in return.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          cols={60}
          placeholder="Write here..."
          style={{ padding: '1rem', fontSize: '1rem', width: '100%' }}
        />
        <button
          type="submit"
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            fontSize: '1rem',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Inspire&nbsp;Me
        </button>
      </form>

      {poem && (
        <div
          style={{
            marginTop: '2rem',
            borderTop: '1px solid #ccc',
            paddingTop: '1rem',
          }}
        >
          <h2 style={{ fontSize: '1.5rem' }}>Your Poem</h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{poem}</p>
        </div>
      )}
    </div>
  );
}

export default App;






