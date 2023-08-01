const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const File = require('../models/files');

require('dotenv').config();

exports.uploadFile = async (req, res, next) => {
  if (req.method === 'POST') {
    try {
      const { base64File, filename, fileSize, fileType } = req.body; 

      const storageAccount = process.env.AZURE_STORAGE_ACCOUNT_NAME;
      const containerName = process.env.AZURE_CONTAINER_NAME;
      const accessKey = process.env.AZURE_STORAGE_ACCOUNT_KEY; 
      const connectionString = process.env.AZURE_CONNECTION_STRING;

      const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

      const containerClient = blobServiceClient.getContainerClient(containerName);
      const fileBuffer = Buffer.from(base64File, 'base64');
      const blockBlobClient = containerClient.getBlockBlobClient(filename);
      await blockBlobClient.uploadData(fileBuffer, { blobHTTPHeaders: { blobContentType: 'text/plain' } });

      const uniqueFileName = `${uuidv4()}-${filename}`;

      const newFile = new File({
        filename: filename,
        fileType: fileType,
        fileSize: fileSize,
        fileKey: uniqueFileName,
        fileURL: blockBlobClient.url,
      });

      await newFile.save();

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error occurred' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

exports.fileList = async (req, res) => {
  try {
    const files = await File.find();
    return res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
}