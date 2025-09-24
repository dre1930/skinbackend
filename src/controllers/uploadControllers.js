// controllers/uploadController.js
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  // Construct URL to access the uploaded file
  const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.json({ url });
};
