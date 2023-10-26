import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { getRecordsByCategory } from "../api/api.js";

const Category = ({ category }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getRecordsByCategory(
        "courses",
        {category}
      );
      setCourses(coursesData);
    };

    fetchData();
  }, [category]);

  return (
    <div>
      <h2>{category.name} courses:</h2>
      <Card courses={courses} />
    </div>
  );
};

export default Category;
