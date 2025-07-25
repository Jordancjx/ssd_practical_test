// src/Result.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const searchTerm = params.get('search') || '';

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search Result</h1>
      <p>You searched for: <strong>{searchTerm}</strong></p>
      <button
        onClick={() => navigate('/')}
        style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginTop: '1rem' }}
      >
        Back
      </button>
    </div>
  );
}
