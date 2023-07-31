const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const File = require('../models/files');

require('dotenv').config();

const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.AZURE_STORAGE_ACCOUNT_NAME,
    process.env.AZURE_STORAGE_ACCOUNT_KEY
);

const blobServiceClient = new BlobServiceClient(
    `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    sharedKeyCredential
);

const upload = multer({
    storage: multer.memoryStorage(),
});

exports.uploadFile = async (req, res, next) => {
    try{
        const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a file!' });
    }

    // Generate a unique filename using UUID
    const uniqueFileName = `${uuidv4()}-${file.name}`;

    // Get a reference to the container
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

    // Upload the file to Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(uniqueFileName);
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: {
        blobContentType: file.type,
        blobContentDisposition: `attachment; filename="${file.name}"`,
      },
    });

    // Save file information to the database
    const newFile = new File({
      filename: file.name,
      fileType: file.type,
      fileSize: file.size,
      fileKey: uniqueFileName,
      fileURL: blockBlobClient.url,
    });

    await newFile.save();

    return res.status(201).json({ message: 'File uploaded successfully!', file: newFile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error!' });
    }
}