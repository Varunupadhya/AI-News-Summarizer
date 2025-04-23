import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!url) return;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/summarize', { url });
      setSummary(res.data.summary);
    } catch (error) {
      console.error('Error summarizing article:', error);
      setSummary('Failed to summarize the article. Please check the URL and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>News Summarizer</h1>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter news URL"
        disabled={loading}
      />
      <button
        onClick={summarize}
        disabled={loading}
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {loading && <div className="spinner"></div>}

      {!loading && summary && <p>{summary}</p>}
    </div>
  );
}

export default App;