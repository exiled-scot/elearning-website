import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import slugify from "slugify";
import ProductPage from "./pages/ProductPage";
import { getRecords } from './api/api.js';

const App = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getRecords("courses");
      setCourses(coursesData);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          {courses.map((course) => (
            <Route
              key={course.title}
              path={`/courses/${slugify(course.title)}`}
              element={<ProductPage course={course} />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
