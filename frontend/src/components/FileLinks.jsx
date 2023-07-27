import React, { useState } from 'react';
import { getFileLinks } from '../api/api';

const FileLinks = () => {
  const [fileId, setFileId] = useState('');
  const [fetchingLinks, setFetchingLinks] = useState(false);
  const [fetchLinksError, setFetchLinksError] = useState(null);
  const [links, setLinks] = useState([]);

  const handleFileIdChange = (event) => {
    setFileId(event.target.value);
  };

  const handleFetchLinks = async () => {
    if (!fileId) {
      return;
    }

    setFetchingLinks(true);

    try {
      const response = await getFileLinks(fileId);
      console.log('Links fetched successfully:', response);
      setLinks(response.links);
      setFetchingLinks(false);
      setFetchLinksError(null);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
      setFetchingLinks(false);
      setFetchLinksError('Error fetching links. Please try again.');
    }
  };

  return (
    <div>
      <h2>File Links</h2>
      <div>
        <label>File ID:</label>
        <input type="text" value={fileId} onChange={handleFileIdChange} />
      </div>
      <button onClick={handleFetchLinks} disabled={fetchingLinks}>Fetch Links</button>
      {fetchLinksError && <p>{fetchLinksError}</p>}
      {links.length > 0 ? (
        <div>
          <h3>Links:</h3>
          <ul>
            {links.map((link, index) => (
              <li key={index}>{link}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No links found for the provided file ID.</p>
      )}
    </div>
  );
};

export default FileLinks;
