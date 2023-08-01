import React, { useState } from 'react';
import axios from 'axios';

const AccessControl = () => {
  const [fileId, setFileId] = useState('');
  const [email, setEmail] = useState('');
  const [accessStatus, setAccessStatus] = useState('');

  const handleFileIdChange = (event) => {
    setFileId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const requestAccess = async () => {
    if (!fileId || !email) {
      alert('Please enter both the file ID and your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/access-file', {
        fileId,
        email,
      });

      if (response.status === 201) {
        setAccessStatus('Access requested successfully!');
      }
    } catch (error) {
      console.error('Error requesting access:', error);
      setAccessStatus('Error requesting access. Please try again.');
    }
  };

  return (
    <div>
      <h2>Request Access</h2>
      <div>
        <label>File ID:</label>
        <input type="text" value={fileId} onChange={handleFileIdChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <button onClick={requestAccess}>Request Access</button>
      {accessStatus && <p>{accessStatus}</p>}
    </div>
  );
};

export default AccessControl;
