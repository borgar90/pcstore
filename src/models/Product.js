import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  type: { type: String, enum: ['part', 'pc', 'other'], required: true },
  stock: { type: Number, default: 0 },
  gallery: { type: mongoose.Schema.Types.ObjectId, ref: 'Gallery' },
  specs: { type: Map, of: String },
  isFeatured: { type: Boolean, default: false },
  isMainFeatured: { type: Boolean, default: false },
  isFeaturedSlider: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);

export default Product;