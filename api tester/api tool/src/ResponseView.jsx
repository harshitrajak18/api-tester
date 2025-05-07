import React from 'react';

const ResponseView = ({ response, goBack }) => {
  return (
    <div className="response-screen">
      <h2>Response</h2>
      <div className="response">{response}</div>
      <button onClick={goBack}>Back to Request</button>
    </div>
  );
};

export default ResponseView;
