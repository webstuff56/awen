// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="logo">awen</h1>
      <p className="poetic-teaser">“The muse is listening.”</p>
      <p className="subtitle">Speak from the heart. Awen responds in verse.</p>

      <div className="description-block">
        <p>Write to your muse — a letter, a feeling, a memory.</p>
        <p>Awen transforms it into something poetic, unexpected, and moving.</p>
      </div>

      <div className="cta-row">
        <Link to="/join">
          <button className="cta-button">Join Awen</button>
        </Link>
        <span className="tooltip-icon" title="Create a private account to receive personalized poems and save your letters.">?</span>
      </div>

      <p className="login-prompt">
        Returning? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}





