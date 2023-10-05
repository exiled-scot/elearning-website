import React from 'react';
import Reviews from '../components/Reviews';
import ReadMore from '../components/ReadMore';
import './ProductPage.css';

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
      <img
        src={`http://localhost:5002/api/files/at7b3ntpxm6n6r1/${course.id}/${course.image}?token=`}
        alt="image"
        className="card-image"
      />
      <div className="course-content-box">
        <h2>What you'll learn</h2>
        <CourseContent content={course.content} />
      </div>
      <ReadMore text={course.description} />
      <Reviews reviews={course.reviews}/>
    </div>
  );
};

export default ProductPage;
