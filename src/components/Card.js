import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import slugify from "slugify";

const Card = ({ courses }) => {
  const [hoveredCourseId, setHoveredCourseId] = useState(null);

  const handleMouseEnter = (courseId) => {
    setHoveredCourseId(courseId);
  };

  const handleMouseLeave = () => {
    setHoveredCourseId(null);
  };

  if (!courses || courses.length === 0) {
    return null; // Return nothing if courses is empty, null or undefined
  }

  return (
    <div className="card-container">
      {courses.map((course) => (
        <Link
          to={`/courses/${slugify(course.id)}`}
          className="card-link"
          style={{ textDecoration: "none", color: "inherit" }}
          key={course.id} // Move the key prop to the Link component
        >
          <div
            className={`card ${hoveredCourseId === course.id ? "hovered" : ""}`}
            onMouseEnter={() => handleMouseEnter(course.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-wrapper">
              <img
                src={`http://localhost:5002/api/files/h0ynbdfoqmz1vn8/${course.id}/${course.image}?token=`}
                alt="image"
                className="card-image"
              />
              <div className="image-overlay"></div>
            </div>
            <div className="wrapper">
              <div className="content">
                <h2 className="title">{course.title}</h2>
                <p className="instructor">{course.instructor}</p>
                <div className="description-container">
                  <p className="description">{course.description}</p>
                  <div className="description-fade"></div>
                </div>
              </div>
              <button
                className="button-28 buy-button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  window.location.href = `/courses/${slugify(course.id)}/purchase`;
                }}
              >
                Buy this course
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
