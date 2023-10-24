import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Category from "./pages/Category";
import Layout from "./components/Layout";
import slugify from "slugify";
import ProductPage from "./pages/ProductPage";
import { getRecords } from "./api/api.js";
import InstructorPage from "./pages/InstructorPage";
import Categories from "./pages/Categories";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getRecords("courses");
      const instructorsData = await getRecords("instructors");
      setCourses(coursesData);
      setInstructors(instructorsData);
    };

    fetchData();
  }, []);

  const categories = [
    { name: "Programming", slug: "programming" },
    { name: "Technology", slug: "technology" },
    { name: "Engineering", slug: "engineering"}
    ];

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
          <Route path="/categories" element={<Categories />} />
          {/* Add dynamic routes for each category */}
          {categories.map((category) => (
            <Route
              key={`category-${category.slug}`}
              path={`/category/${category.slug}`}
              element={<Category category={category.name} />}
            />
          ))}
          {/* Add product routes */}
          {courses.map((course) => (
            <Route
              key={course.title}
              path={`/courses/${slugify(course.title)}`}
              element={<ProductPage course={course} />}
            />
          ))}
          {/* Add instructor routes */}
          {instructors.map((instructor) => (
            <Route
              key={instructor.name}
              path={`/users/${slugify(instructor.name)}`}
              element={<InstructorPage instructor={instructor} />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
