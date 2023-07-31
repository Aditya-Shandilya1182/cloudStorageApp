import { BlobServiceClient } from '@azure/storage-blob';
require('dotenv').config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { base64File, filename } = req.body; 

      const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
      const containerName = process.env.AZURE_CONTAINER_NAME;
      const accessKey = process.env.AZURE_STORAGE_ACCOUNT_KEY; 
      const connectionString = process.env.AZURE_CONNECTION_STRING;

      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

      const containerClient = blobServiceClient.getContainerClient(containerName);
      const fileBuffer = Buffer.from(base64File, 'base64');
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      await blockBlobClient.uploadData(fileBuffer, { blobHTTPHeaders: { blobContentType: 'text/plain' } });

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}