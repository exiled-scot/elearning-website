import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { getRecordsByCategory } from "../api/api.js";

const Categories = ({ categories }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getRecordsByCategory("courses", { categories });
      console.log(coursesData); // Add this line to log the coursesData
      setCourses(coursesData);
    };

    fetchData();
  }, [categories]);

  return (
    <div>
      <h2>{categories.name} courses:</h2>
      <Card courses={courses} />
      <p>Testing</p>
    </div>
  );
};

export default Categories;
