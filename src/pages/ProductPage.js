import React from 'react';

const CourseContent = ({ content }) => {
  // Parse the JSON object
  const parsedContent = JSON.parse(content);

  // Access the course_contents array
  const courseContentList = parsedContent.course_contents.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  return (
    <div>
      <ul>
        {courseContentList}
      </ul>
    </div>
  );
};

const ProductPage = ({ course }) => {
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      <h2>What you'll learn</h2>
      <CourseContent content={course.content} />
    </div>
  );
};

export default ProductPage;
