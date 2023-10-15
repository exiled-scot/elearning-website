import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import slugify from "slugify";
import ProductPage from "./pages/ProductPage";
import { getRecords } from './api/api.js';
import InstructorPage from "./pages/InstructorPage";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getRecords("courses");
      setCourses(coursesData);
    };

    const fetchInstructors = async () => {
      const instructorsData = await getRecords("instructors");
      setInstructors(instructorsData);
    };

    fetchCourses();
    fetchInstructors();
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
          {instructors.map((instructor) => {
            return (
              <Route
                key={instructor.name}
                path={`/users/${slugify(instructor.name)}`}
                element={<InstructorPage instructor={instructor} />}
              />
            );
          })}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
