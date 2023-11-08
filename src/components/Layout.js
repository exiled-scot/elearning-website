import React from 'react';
import Header from '../components/Header';
import './Layout.css'; // Make sure the path to Layout.css is correct
import NavMenu from '../components/NavMenu';

function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="main-content">
        {children}
      </div>
      <NavMenu />
    </div>
  );
}

export default Layout;
