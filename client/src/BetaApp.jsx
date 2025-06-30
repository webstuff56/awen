import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Join from './Join';
import Login from './Login';
import Wall from './Wall';

export default function BetaApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wall" element={<Wall />} />
      </Routes>
    </BrowserRouter>
  );
}

 
