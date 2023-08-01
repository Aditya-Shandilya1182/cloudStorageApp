import { useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = async () => {
    if (selectedFile) {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
          const base64File = reader.result.split(',')[1];
          await axios.post('http://localhost:3000/api/upload', { base64File, filename: selectedFile.name, fileSize: selectedFile.size, fileType: selectedFile.type });
        };
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File to storage account</button>
    </div>
  );
}