import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Layout.css';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
