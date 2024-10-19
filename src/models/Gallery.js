import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mainPhoto: { type: String, required: true },
  photos: [{ type: String }],
  relatedTo: {
    type: { type: String, enum: ['product', 'category'], required: true },
    id: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
});
console.log('Gallery model is being loaded');
const Gallery = mongoose.model('Gallery', GallerySchema);

export default Gallery;