import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Success = () => {
  const { state } = useLocation();

  return (
    <div style={{ padding: '30px', textAlign: 'center' }}>
      <h2>Submission Successful 🎉</h2>
      <pre style={{ textAlign: 'left', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '10px' }}>
        {JSON.stringify(state, null, 2)}
      </pre>
      <Link to="/">Back to Form</Link>
    </div>
  );
};

export default Success;
