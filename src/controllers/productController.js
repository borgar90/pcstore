import Product from '../models/Product.js';

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
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
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