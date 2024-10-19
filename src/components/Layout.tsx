import React from 'react';
import Header from './Header';
import Footer from './Footer';
import GDPRWarning from './GDPRWarning';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
    <GDPRWarning />
  </div>
);

export default Layout;