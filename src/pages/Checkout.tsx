import React, { useState } from 'react';
import { CreditCard, Truck } from 'lucide-react';

const Checkout: React.FC = () => {
  const [showAccessories, setShowAccessories] = useState(true);

  const accessories = [
    { id: 1, name: 'Gaming Headset', price: 999, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Mekanisk Tastatur', price: 1499, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Gaming Mus', price: 799, image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Kasse</h1>
      
      {showAccessories && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Legg til tilbehør?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {accessories.map((item) => (
              <div key={item.id} className="bg-white shadow-md rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.price} kr</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full">
                  Legg til
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Leveringsinformasjon</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Navn</label>
              <input type="text" id="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">Adresse</label>
              <input type="text" id="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">By</label>
              <input type="text" id="city" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="postcode" className="block text-gray-700 text-sm font-bold mb-2">Postnummer</label>
              <input type="text" id="postcode" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Betalingsinformasjon</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="cardName" className="block text-gray-700 text-sm font-bold mb-2">Navn på kort</label>
              <input type="text" id="cardName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">Kortnummer</label>
              <input type="text" id="cardNumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="expiry" className="block text-gray-700 text-sm font-bold mb-2">Utløpsdato</label>
                <input type="text" id="expiry" placeholder="MM/ÅÅ" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="cvv" className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
                <input type="text" id="cvv" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Ordresammendrag</h2>
        <div className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>20598 kr</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Frakt:</span>
            <span>99 kr</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Totalt:</span>
            <span>20697 kr</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-300 flex items-center">
          <CreditCard className="mr-2" />
          Fullfør bestilling
        </button>
      </div>
    </div>
  );
};

export default Checkout;