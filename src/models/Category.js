import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  slug: { type: String, required: true, unique: true },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;