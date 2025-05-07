import React, { useState } from 'react';
import './App.css';
import ResponseView from './ResponseView';

const App = () => {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [headers, setHeaders] = useState(`{
  "Content-Type": "application/json"
}`);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setShowResponse(false);

    try {
      const parsedHeaders = JSON.parse(headers);
      const options = {
        method,
        headers: parsedHeaders,
      };
      if (method !== 'GET' && method !== 'DELETE' && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const data = await res.text();
      setResponse(data);
      setShowResponse(true);
    } catch (err) {
      setResponse('Error: ' + err.message);
      setShowResponse(true);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>API Tester</h1>
      {!showResponse ? (
        <>
          <div className="form">
            <input
              type="text"
              placeholder="Enter API URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>PATCH</option>
              <option>DELETE</option>
            </select>
            <textarea
              rows={5}
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              placeholder="Headers (JSON)"
            />
            <textarea
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Body (for POST/PUT/PATCH)"
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
          {loading && <div className="loading">Loading...</div>}
        </>
      ) : (
        <ResponseView response={response} goBack={() => setShowResponse(false)} />
      )}
    </div>
  );
};

export default App;
