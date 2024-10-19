import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Om NorskPC</h3>
          <p>Vi leverer høykvalitets gaming-PCer og komponenter til entusiaster over hele Norge.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Kontakt oss</h3>
          <p>E-post: kontakt@norskpc.no</p>
          <p>Telefon: +47 123 45 678</p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Følg oss</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400"><Facebook /></a>
            <a href="#" className="hover:text-pink-400"><Instagram /></a>
            <a href="#" className="hover:text-blue-300"><Twitter /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2024 NorskPC. Alle rettigheter reservert.</p>
      </div>
    </footer>
  );
};

export default Footer;