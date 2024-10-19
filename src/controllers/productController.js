import Product from '../models/Product.js';
import Gallery from '../models/Gallery.js';
import * as galleryController from './galleryController.js';

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const { mainPhoto, photos } = req.files;

    // Opprett nytt produkt
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();

    // Opprett galleri for produktet
    const galleryData = {
      name: `Galleri for ${savedProduct.name}`,
      mainPhoto: mainPhoto[0].filename,
      photos: photos.map(file => file.filename),
      relatedTo: {
        type: 'product',
        id: savedProduct._id
      }
    };

    const gallery = new Gallery(galleryData);
    await gallery.save();

    // Oppdater produktet med galleri-ID
    savedProduct.gallery = gallery._id;
    await savedProduct.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Feil ved oppretting av produkt', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { mainPhoto, photos } = req.files;

    // Oppdater produkt
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produkt ikke funnet' });
    }

    // Oppdater eller opprett galleri
    let gallery = await Gallery.findOne({ 'relatedTo.id': updatedProduct._id });
    
    if (gallery) {
      // Oppdater eksisterende galleri
      gallery.name = `Galleri for ${updatedProduct.name}`;
      if (mainPhoto) gallery.mainPhoto = mainPhoto[0].filename;
      if (photos) gallery.photos = photos.map(file => file.filename);
      await gallery.save();
    } else {
      // Opprett nytt galleri
      const galleryData = {
        name: `Galleri for ${updatedProduct.name}`,
        mainPhoto: mainPhoto ? mainPhoto[0].filename : '',
        photos: photos ? photos.map(file => file.filename) : [],
        relatedTo: {
          type: 'product',
          id: updatedProduct._id
        }
      };
      gallery = new Gallery(galleryData);
      await gallery.save();

      // Oppdater produktet med galleri-ID
      updatedProduct.gallery = gallery._id;
      await updatedProduct.save();
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Feil ved oppdatering av produkt', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await Product.find({ isFeatured: true });
    res.json(featuredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching featured products', error: error.message });
  }
};

export const getMainFeaturedProduct = async (req, res) => {
  try {
    const mainFeaturedProduct = await Product.findOne({ isMainFeatured: true });
    res.json(mainFeaturedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching main featured product', error: error.message });
  }
};

export const setMainFeatured = async (req, res) => {
  try {
    const { productId } = req.body;
    await Product.updateMany({}, { $set: { isMainFeatured: false } });
    const product = await Product.findByIdAndUpdate(productId, { isMainFeatured: true }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error setting main featured product', error: error.message });
  }
};

export const setFeaturedSlider = async (req, res) => {
  try {
    const { productId, isFeaturedSlider } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { isFeaturedSlider }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error setting featured slider product', error: error.message });
  }
};

export const setFeaturedProduct = async (req, res) => {
  try {
    const { productId, isFeatured } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { isFeatured }, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error setting featured product', error: error.message });
  }
};