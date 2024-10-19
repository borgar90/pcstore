import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Cpu, HardDrive, ChevronRight, ChevronLeft } from 'lucide-react';
import { getProducts } from '../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  isMainFeatured: boolean;
  isFeaturedSlider: boolean;
}

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [mainFeaturedProduct, setMainFeaturedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      if (products && products.length > 0) {
        setFeaturedProducts(products.filter((p: Product) => p.isFeaturedSlider));
        setMainFeaturedProduct(products.find((p: Product) => p.isMainFeatured) || null);
      } else {
        setError('No products found');
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setError('Failed to fetch featured products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {mainFeaturedProduct && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Product</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={mainFeaturedProduct.image} alt={mainFeaturedProduct.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{mainFeaturedProduct.name}</h3>
              <p className="text-xl font-semibold mb-4">{mainFeaturedProduct.price} kr</p>
              <Link to={`/product/${mainFeaturedProduct._id}`} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                View Details
              </Link>
            </div>
          </div>
        </div>
      )}

      {featuredProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-lg font-semibold mb-4">{product.price} kr</p>
                  <Link to={`/product/${product._id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Våre tjenester</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-100 p-6 rounded-lg">
            <Monitor className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-bold mb-2">Ferdigbygde Gaming-PCer</h3>
            <p>Høyytelses gaming-PCer klar for action, bygget av våre eksperter.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <Cpu className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-bold mb-2">Tilpasset PC-bygger</h3>
            <p>Bygg din drømme-PC med vårt brukervennlige byggesystem.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg">
            <HardDrive className="w-12 h-12 mb-4 text-blue-600" />
            <h3 className="text-xl font-bold mb-2">Komponenter og tilbehør</h3>
            <p>Et bredt utvalg av de nyeste og beste PC-komponentene.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Om oss</h2>
        <p className="mb-4">
          NorskPC er Norges ledende leverandør av gaming-PCer og komponenter. Med over 10 års erfaring i bransjen, 
          er vi dedikert til å levere topp kvalitet og service til våre kunder.
        </p>
        <p>
          Vårt team av eksperter er alltid klare til å hjelpe deg med å finne den perfekte løsningen for dine gaming-behov, 
          enten du er nybegynner eller erfaren entusiast.
        </p>
      </section>
    </div>
  );
};

export default Home;