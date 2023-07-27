const File = require('../models/files');
const Access = require('../models/access');

// Function to control access to the file via email
exports.accessFile = async (req, res) => {
  try {
    const { fileId, email } = req.body;
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found!' });
    }

    const access = await Access.findOne({ fileId, email });
    if (!access) {
      return res.status(401).json({ error: 'Access denied!' });
    }

    // Implement your logic here to serve the file to the user with the provided email.

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
};
