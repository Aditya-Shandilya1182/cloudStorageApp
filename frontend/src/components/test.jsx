import React from 'react';
import { useState } from 'react';

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      console.log(formData);
      formData.append('file', selectedFile);

      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify({
          originalname: formData,
          mimetype: formData,
          size: formData
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        // You can handle success actions here if needed
      } else {
        console.error('File upload failed.');
        // You can handle error actions here if needed
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={!selectedFile}>
        Upload File
      </button>
    </div>
  );
}

export default Dashboard