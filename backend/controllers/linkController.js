const File = require('../models/files');
const Link = require('../models/link');

// Function to create a link for sharing the file
exports.createFileLink = async (req, res) => {
  try {
    const { fileId, email } = req.body;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found!' });
    }

    const link = new Link({ fileId: file._id, email });
    await link.save();

    return res.status(201).json({ message: 'Link created successfully!', link });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
};

// Function to get all links for a file
exports.getFileLinks = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found!' });
    }

    const links = await Link.find({ fileId });
    return res.status(200).json({ links });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
};
