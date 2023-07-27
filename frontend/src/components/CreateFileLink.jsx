import React, { useState } from 'react';
import { createFileLink } from '../api/api';

const CreateFileLink = () => {
  const [fileId, setFileId] = useState('');
  const [email, setEmail] = useState('');
  const [creatingLink, setCreatingLink] = useState(false);
  const [createLinkError, setCreateLinkError] = useState(null);
  const [link, setLink] = useState(null);

  const handleFileIdChange = (event) => {
    setFileId(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCreateLink = async () => {
    if (!fileId || !email) {
      return;
    }

    setCreatingLink(true);

    try {
      const response = await createFileLink(fileId, email);
      console.log('Link created successfully:', response);
      setLink(response.link);
      setCreatingLink(false);
      setCreateLinkError(null);
    } catch (error) {
      console.error('Error creating link:', error);
      setLink(null);
      setCreatingLink(false);
      setCreateLinkError('Error creating link. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create File Link</h2>
      <div>
        <label>File ID:</label>
        <input type="text" value={fileId} onChange={handleFileIdChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <button onClick={handleCreateLink} disabled={creatingLink}>Create Link</button>
      {createLinkError && <p>{createLinkError}</p>}
      {link && <p>Link created: {link}</p>}
    </div>
  );
};

export default CreateFileLink;
