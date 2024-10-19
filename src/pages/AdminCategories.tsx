import React, { useState, useEffect } from 'react';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../services/api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import CategoryModal from '../components/CategoryModal';
interface Category {
  _id: string;
  name: string;
  description: string;
  slug: string;
}

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error('Feil ved henting av kategorier:', error);
      setError('Kunne ikke hente kategorier. Vennligst prøv igjen senere.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (id: string, categoryData: Partial<Category>) => {
    try {
      await updateCategory(id, categoryData);
      fetchCategories();
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (error) {
      console.error('Feil ved oppdatering av kategori:', error);
      setError('Kunne ikke oppdatere kategori. Vennligst prøv igjen.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Er du sikker på at du vil slette denne kategorien?')) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch (error) {
        console.error('Feil ved sletting av kategori:', error);
        setError('Kunne ikke slette kategori. Vennligst prøv igjen.');
      }
    }
  };

  const openModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const generateSlug = (name: string): string => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const handleCreateCategory = async (categoryData: Omit<Category, '_id'>) => {
    try {
      const newCategoryData = {
        ...categoryData,
        slug: generateSlug(categoryData.name)
      };
      await createCategory(newCategoryData);
      fetchCategories();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Feil ved oppretting av kategori:', error);
      setError('Kunne ikke opprette kategori. Vennligst prøv igjen.');
    }
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
        <h1 className="text-3xl font-bold">Administrer kategorier</h1>
        <button
          onClick={() => openModal()}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Legg til kategori
        </button>
      </div>
      {categories?.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-gray-600">Ingen kategorier funnet. Klikk på "Legg til kategori" for å opprette en ny.</p>
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Navn</th>
                <th className="py-3 px-4 text-left">Beskrivelse</th>
                <th className="py-3 px-4 text-left">Slug</th>
                <th className="py-3 px-4 text-left">Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((category) => (
                <tr key={category._id} className="border-b">
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.description}</td>
                  <td className="py-3 px-4">{category.slug}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => openModal(category)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
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
      <CategoryModal
      category={editingCategory}
      onClose={() => setIsModalOpen(false)}
      onSave={(id, categoryData) => 
        id ? handleUpdateCategory(id, categoryData) : handleCreateCategory(categoryData as Omit<Category, '_id'>)
      }
    />
    )}
    </div>
  );
};

export default AdminCategories;
