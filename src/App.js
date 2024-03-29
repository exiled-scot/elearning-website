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
import MyLearning from "./pages/MyLearning";
import Explore from "./pages/Explore";
import CloudLabs from "./pages/CloudLabs";
import PersonalisedPaths from "./pages/PersonalisedPaths";
import Projects from "./pages/Projects";
import SkillPaths from "./pages/SkillPaths";
import Assessments from "./pages/Assessments";
import Logout from "./components/Logout";
import { User } from "./api/models/User";
import ProfilePage from "./pages//ProfilePage";
import Instructor from "./api/models/Instructor.js";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getRecords("users");
        const coursesData = await getRecords("courses");
        const instructorsData = await getRecords("instructors");

        const users = usersData.map((userData) => {
          const user = new User(
            userData.id,
            userData.username,
            userData.email,
            userData.name
          );
          return user;
        });

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

        const instructors = instructorsData.map((instructorData) => {
          const instructor = new Instructor(
            instructorData.id,
            instructorData.name,
            instructorData.title,
            instructorData.about,
            instructorData.social_media,
            instructorData.profilePhoto
          );
          return instructor;
        });

        setCourses(courses);
        setInstructors(instructors);
        setUsers(users);
        setLoading(false);
      } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error);
        // You can also set an error state or display an error message to the user
      }
    };

    fetchData();
  }, []);

  const categories = [
    { name: "Programming", slug: "programming" },
    { name: "Technology", slug: "technology" },
    { name: "Engineering", slug: "engineering" },
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
          <Route
            path="/mylearning"
            element={
              loading ? (
                <p>Loading...</p>
              ) : (
                <MyLearning courses={courses} />
              )
            }
          />
          <Route path="/explore" element={<Explore />} />
          <Route path="/cloudlabs" element={<CloudLabs />} />
          <Route path="/personalisedpaths" element={<PersonalisedPaths />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skillpaths" element={<SkillPaths />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/logout" element={<Logout />} />
  
          {categories.map((category) => (
            <Route
              key={`category-${category.slug}`}
              path={`/category/${category.slug}`}
              element={<Categories categories={category.name} />}
            />
          ))}
  
          {courses.map((course) => (
            <Route
              key={course.title}
              path={`/courses/${createSlug(course.title)}`}
              element={<ProductPage course={course} />}
            />
          ))}
  
          {users.map((user) => (
            <Route
              key={user.name}
              path={`/accounts/${createSlug(user.id)}`}
              element={<ProfilePage user={user} />}
            />
          ))}
  
          {instructors.map((instructor) => (
            <Route
              key={instructor.name}
              path={`/instructors/${createSlug(instructor.name)}`}
              element={<InstructorPage instructor={instructor} />}
            />
          ))}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
