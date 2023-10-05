import React, { useState } from 'react';
import Reviews from '../components/Reviews';
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
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Extract the first 2 paragraphs from the description
  const descriptionParagraphs = course.description.split('\n').slice(0, 2).join('\n');
  // Check if there are remaining paragraphs
  const shouldShowReadMore = course.description.split('\n').length > 2;

  const handleReadMoreClick = () => {
    setShowFullDescription(true);
  };

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
      {shouldShowReadMore ? (
        <>
          {showFullDescription ? (
            <p>{course.description}</p>
          ) : (
            <>
              <p>{descriptionParagraphs}</p>
              <p onClick={handleReadMoreClick} className="read-more-link">Read More</p>
            </>
          )}
        </>
      ) : (
        <p>{course.description}</p>
      )}
      <Reviews reviews={course.reviews}/>
    </div>
  );
};

export default ProductPage;
