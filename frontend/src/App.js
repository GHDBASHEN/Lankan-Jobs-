import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/example')
      .then(res => setData(res.data.message))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>React + Express App</h1>
      <p>API says: <strong>{data}</strong></p>
    </div>
  );
}

export default App;
