import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {/* Main content */}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
