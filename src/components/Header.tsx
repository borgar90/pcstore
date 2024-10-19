import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Cpu, Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">NorskPC</Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/" className="flex items-center"><Home className="mr-1" size={18} /> Hjem</Link></li>
            <li><Link to="/shop" className="flex items-center"><Cpu className="mr-1" size={18} /> Butikk</Link></li>
            <li><Link to="/builder" className="flex items-center"><Cpu className="mr-1" size={18} /> PC-bygger</Link></li>
            <li><Link to="/cart" className="flex items-center"><ShoppingCart className="mr-1" size={18} /> Handlekurv</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;