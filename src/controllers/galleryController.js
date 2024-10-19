
import Gallery from '../models/Gallery.js';

import multer from 'multer';
import path from 'path';

// Konfigurer multer for fillagring
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const createGallery = async (req, res) => {
  try {
    const { name, relatedTo } = req.body;
    const mainPhoto = req.files['mainPhoto'][0].filename;
    const photos = req.files['photos'].map((file) => file.filename);

    const gallery = new Gallery({
      name,
      mainPhoto,
      photos,
      relatedTo: JSON.parse(relatedTo),
    });

    await gallery.save();
    res.status(201).json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Kunne ikke opprette galleri', error });
  }
};

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Galleri ikke funnet' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Kunne ikke hente galleri', error });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { name, relatedTo } = req.body;
    const updateData = { name, relatedTo: JSON.parse(relatedTo) };

    if (req.files['mainPhoto']) {
      updateData.mainPhoto = req.files['mainPhoto'][0].filename;
    }
    if (req.files['photos']) {
      updateData.photos = req.files['photos'].map((file) => file.filename);
    }

    const gallery = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!gallery) {
      return res.status(404).json({ message: 'Galleri ikke funnet' });
    }
    res.json(gallery);
  } catch (error) {
    res.status(400).json({ message: 'Kunne ikke oppdatere galleri', error });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: 'Galleri ikke funnet' });
    }
    res.json({ message: 'Galleri slettet' });
  } catch (error) {
    res.status(400).json({ message: 'Kunne ikke slette galleri', error });
  }
};
