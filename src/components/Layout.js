import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Layout.css'; // Make sure the path to Layout.css is correct

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
