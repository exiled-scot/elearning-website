import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

import './App.css';

const App = () => {

  return (
    <Layout>
      <HomePage/>
    </Layout>
  );
};

export default App;
