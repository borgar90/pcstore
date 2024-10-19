import React, { useState, useEffect } from 'react';
import { Cpu, Filter, SortAsc, HardDrive, MemoryStick, DollarSign, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories, addToCart } from '../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  specs: string;
  image: string;
  category: string;
  storage: number;
  ram: number;
  processor: string;
}

interface Category {
  _id: string;
  name: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'name'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [selectedStorage, setSelectedStorage] = useState<number | null>(null);
  const [selectedRam, setSelectedRam] = useState<number | null>(null);
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await getProducts();
      if (response && response.data) {
        setProducts(response.data);
      } else {
        setError('No products found');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response && response.data) {
        setCategories(response.data);
      } else {
        setError('No categories found');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error fetching categories');
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setError('Error adding product to cart');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Våre Gaming-PCer</h1>
      
      {/* Filtering and sorting UI */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2">{product.specs}</p>
                <p className="text-2xl font-bold mb-4">{product.price} kr</p>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300 flex items-center justify-center w-full"
                >
                  <Cpu className="mr-2" size={18} />
                  Legg i handlekurv
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;