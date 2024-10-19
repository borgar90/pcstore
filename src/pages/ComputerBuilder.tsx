import React, { useState, useEffect } from 'react';
import { Cpu, HardDrive, MemoryStick, Fan } from 'lucide-react';
import { getProducts, createCustomPc } from '../services/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  type: string;
  specs: Record<string, string>;
}

interface BuildItem {
  part: Product;
  quantity: number;
}

const ComputerBuilder: React.FC = () => {
  const [parts, setParts] = useState<Record<string, Product[]>>({});
  const [build, setBuild] = useState<Record<string, BuildItem>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    try {
      const response = await getProducts();
      if (response && response.data) {
        const fetchedParts = response.data.reduce((acc: Record<string, Product[]>, product: Product) => {
          if (!acc[product.type]) {
            acc[product.type] = [];
          }
          acc[product.type].push(product);
          return acc;
        }, {});
        setParts(fetchedParts);
      } else {
        setError('No parts found');
      }
    } catch (error) {
      console.error('Error fetching parts:', error);
      setError('Error fetching parts');
    }
  };

  const updateBuild = (category: string, item: Product) => {
    setBuild({ ...build, [category]: { part: item, quantity: 1 } });
  };

  const calculateTotal = () => {
    return Object.values(build).reduce((total, item) => total + item.part.price * item.quantity, 0);
  };

  const handleSaveCustomPc = async () => {
    try {
      const customPcData = {
        name: 'Custom PC',
        parts: Object.values(build).map(item => ({
          part: item.part._id,
          quantity: item.quantity,
        })),
        totalPrice: calculateTotal(),
      };
      await createCustomPc(customPcData);
      alert('Custom PC saved successfully');
    } catch (error) {
      console.error('Error saving custom PC:', error);
      setError('Error saving custom PC');
    }
  };

  if (error) {
    return <div className="container mx-auto px-4 py-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default ComputerBuilder;