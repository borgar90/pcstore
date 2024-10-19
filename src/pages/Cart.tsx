import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2 } from 'lucide-react';

// Mock data for cart items
const cartItems = [
  { id: 1, name: 'Gaming Beast', price: 19999, quantity: 1 },
  { id: 2, name: 'RGB Fan Pack', price: 599, quantity: 2 },
];

const Cart: React.FC = () => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" />
        Handlekurv
      </h1>
      {cartItems.length === 0 ? (
        <p>Din handlekurv er tom.</p>
      ) : (
        <>
          <div className="bg-white shadow-md rounded my-6">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Produkt</th>
                  <th className="py-3 px-6 text-right">Pris</th>
                  <th className="py-3 px-6 text-center">Antall</th>
                  <th className="py-3 px-6 text-right">Total</th>
                  <th className="py-3 px-6 text-center">Handling</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <span>{item.price} kr</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex justify-center items-center">
                        <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-l cursor-pointer">
                          <span className="m-auto text-lg font-thin">−</span>
                        </button>
                        <input
                          type="text"
                          className="bg-gray-100 text-center w-12 h-8"
                          value={item.quantity}
                          readOnly
                        />
                        <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-6 rounded-r cursor-pointer">
                          <span className="m-auto text-lg font-thin">+</span>
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-right">
                      <span>{item.price * item.quantity} kr</span>
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <button className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-center space-x-4">
            <span className="text-xl font-bold">Totalt: {calculateTotal()} kr</span>
            <Link
              to="/checkout"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Gå til kassen
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;