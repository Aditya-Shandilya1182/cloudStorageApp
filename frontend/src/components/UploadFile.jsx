import React, { useState } from 'react';
import { uploadFile } from '../api/api';

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await uploadFile(formData);
      console.log('File uploaded successfully:', response);
      // Reset file input and state after successful upload
      setFile(null);
      setUploading(false);
      setUploadError(null);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploading(false);
      setUploadError('Error uploading file. Please try again.');
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>Upload</button>
      {uploadError && <p>{uploadError}</p>}
    </div>
  );
};

export default UploadFile;
