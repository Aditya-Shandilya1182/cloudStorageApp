import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filelist = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/filelist');
        setFiles(response.data);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.fileURL} target="_blank" rel="noopener noreferrer">
              {file.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filelist;
