// src/App.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function isValidSearchTerm(term) {
    const regex = /^[a-zA-Z0-9 _-]+$/;
    return regex.test(term);
  }

  function containsSQLInjection(term) {
    const sqlPatterns = [
      /(\b)(OR|AND)(\b)/i,
      /--/,
      /;/,
      /'/,
      /"/,
      /\/\*/,
      /\*\//
    ];
    return sqlPatterns.some(pattern => pattern.test(term));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();

    if (!isValidSearchTerm(trimmed)) {
      setError('Invalid search term! Only letters, numbers, spaces, underscores, and dashes are allowed.');
      setSearchTerm('');
      return;
    }

    if (containsSQLInjection(trimmed)) {
      setError('Input contains disallowed SQL keywords or characters. Please enter a valid search term.');
      setSearchTerm('');
      return;
    }

    setError('');
    navigate(`/result?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Search Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '70%', marginRight: '0.5rem', fontSize: '1rem' }}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>Submit</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}

export default App;
