import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct, getGallery } from '../services/api';
import Gallery from './Gallery';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  // ... andre produktfelter
}

interface GalleryData {
  mainPhoto: string;
  photos: string[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [gallery, setGallery] = useState<GalleryData | null>(null);

  useEffect(() => {
    const fetchProductAndGallery = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);

        const galleryData = await getGallery(productData.galleryId);
        setGallery(galleryData);
      } catch (error) {
        console.error('Feil ved henting av produkt eller galleri:', error);
      }
    };

    fetchProductAndGallery();
  }, [id]);

  if (!product || !gallery) {
    return <div>Laster...</div>;
  }

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      <Gallery mainPhoto={gallery.mainPhoto} photos={gallery.photos} showThumbnails={true} />
      <p>{product.description}</p>
      <p>Pris: {product.price} kr</p>
      {/* Andre produktdetaljer */}
    </div>
  );
};

export default ProductDetails;
