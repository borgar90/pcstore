import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from '../services/api';
import { Plus, Edit, Trash2, X  } from 'lucide-react';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: string;
  stock: number;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error('Feil ved henting av produkter:', error);
      setError('Kunne ikke hente produkter. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Feil ved henting av kategorier:', error);
    }
  };
  const handleCreateProduct = async (productData: FormData) => {
    try {
      const response = await createProduct(productData);
      setProducts(prevProducts => [...(prevProducts || []), response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Feil ved oppretting av produkt:', error);
      setError('Kunne ikke opprette produkt. Vennligst prøv igjen.');
    }
  };

  const handleUpdateProduct = async (id: string, productData: FormData) => {
    try {
      const response = await updateProduct(id, productData);
      setProducts(products.map(p => p._id === id ? response.data : p));
      setIsModalOpen(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Feil ved oppdatering av produkt:', error);
      setError('Kunne ikke oppdatere produkt. Vennligst prøv igjen.');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Er du sikker på at du vil slette dette produktet?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Feil ved sletting av produkt:', error);
        setError('Kunne ikke slette produkt. Vennligst prøv igjen.');
      }
    }
  };

  const openModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Laster...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administrer produkter</h1>
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Legg til produkt
        </button>
      </div>
      {products?.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">Ingen produkter funnet. Klikk på "Legg til produkt" for å opprette et nytt.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Navn</th>
                <th className="py-3 px-4 text-left">Pris</th>
                <th className="py-3 px-4 text-left">Kategori</th>
                <th className="py-3 px-4 text-left">Lager</th>
                <th className="py-3 px-4 text-left">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">{product.price} kr</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openModal(product)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {isModalOpen && (
      <ProductModal
        product={editingProduct}
        categories={categories}
        onClose={() => setIsModalOpen(false)}
        onSave={(id, productData) => 
          id ? handleUpdateProduct(id, productData) : handleCreateProduct(productData as FormData)
        }
      />
    )}
    </div>
  );
};

interface ProductModalProps {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (id: string | undefined, productData: FormData) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, categories, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || {
      name: '',
      description: '',
      price: 0,
      category: '',
      type: '',
      stock: 0,
    }
  );
  const [mainPhoto, setMainPhoto] = useState<File | null>(null);
  const [additionalPhotos, setAdditionalPhotos] = useState<File[]>([]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainPhoto(e.target.files[0]);
    }
  };

  const handleAdditionalPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalPhotos((prev) => [...prev, ...Array.from(e.target.files as FileList)]);
    }
  };
  const removeAdditionalPhoto = (index: number) => {
    setAdditionalPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Legg til produktdata
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });

    // Legg til hovedbilde
    if (mainPhoto) {
      formDataToSend.append('mainPhoto', mainPhoto);
    }

    // Legg til tilleggsbilder
    additionalPhotos.forEach((photo, index) => {
      formDataToSend.append(`additionalPhotos`, photo);
    });

    onSave(product?._id, formDataToSend);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Velg en kategori</option>
              {categories?.map((category:any) => (
                <option key={category._id} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            >
              <option value="">Select a type</option>
              <option value="part">Part</option>
              <option value="pc">PC</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mainPhoto" className="block text-sm font-medium text-gray-700">Hovedbilde</label>
            <input
              type="file"
              id="mainPhoto"
              onChange={handleMainPhotoChange}
              className="mt-1 block w-full"
              accept="image/*"
            />
            {mainPhoto && (
              <div className="mt-2">
                <img src={URL.createObjectURL(mainPhoto)} alt="Hovedbilde forhåndsvisning" className="h-20 w-20 object-cover" />
              </div>
            )}
          </div>

          {/* Tilleggsbilder opplasting */}
          <div className="mb-4">
            <label htmlFor="additionalPhotos" className="block text-sm font-medium text-gray-700">Tilleggsbilder</label>
            <input
              type="file"
              id="additionalPhotos"
              onChange={handleAdditionalPhotosChange}
              className="mt-1 block w-full"
              accept="image/*"
              multiple
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {additionalPhotos.map((photo, index) => (
                <div key={index} className="relative">
                  <img src={URL.createObjectURL(photo)} alt={`Tilleggsbilde ${index + 1}`} className="h-20 w-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => removeAdditionalPhoto(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            >
              Lagre
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProducts;