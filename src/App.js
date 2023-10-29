import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Layout from "./components/Layout";
import slugify from "slugify";
import ProductPage from "./pages/ProductPage";
import { getRecords } from "./api/api.js";
import InstructorPage from "./pages/InstructorPage";
import Categories from "./pages/Categories";
import { Course } from "./api/models/Course";
import SignUp from "./pages/SignUp";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    const coursesData = await getRecords("courses");
    const instructorsData = await getRecords("instructors");

    const courses = coursesData.map((courseData) => {
      const course = new Course(
        courseData.categories,
        courseData.collectionName,
        courseData.content,
        courseData.courseContent,
        courseData.created,
        courseData.description,
        courseData.id,
        courseData.image,
        courseData.instructor,
        courseData.requirements,
        courseData.reviews,
        courseData.title
      );
      return course;
    });

    setCourses(courses);
    setInstructors(instructorsData);
  };

    fetchData();
  }, []);

  const categories = [
    { name: "Programming", slug: "programming" },
    { name: "Technology", slug: "technology" },
    { name: "Engineering", slug: "engineering" }
  ];

  const createSlug = (text) => {
    if (typeof text !== "string") {
      return "";
    }
    return slugify(text);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<h1>Dashboard page</h1>} />
          {/* Add dynamic routes for each category */}
          {categories.map((category) => (
            <Route
              key={`category-${category.slug}`}
              path={`/category/${category.slug}`}
              element={<Categories categories={category.name} />}
            />
          ))}
          {/* Add product routes */}
          {courses.map((course) => (
            <Route
              key={course.title}
              path={`/courses/${createSlug(course.title)}`}
              element={<ProductPage course={course} />}
            />
          ))}
          {/* Add instructor routes */}
          {instructors.map((instructor) => (
            <Route
              key={instructor.name}
              path={`/users/${createSlug(instructor.name)}`}
              element={<InstructorPage instructor={instructor} />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
