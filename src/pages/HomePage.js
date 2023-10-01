import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { getRecords } from '../api/api.js';

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getRecords("courses");
      setCourses(coursesData);
    };

    fetchData();
  }, []);

  return (
      <div>
          <h2>Courses:</h2>
          <Card courses={courses} />
      </div>
  );
};

export default HomePage;
