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

  if (!courses) return null;

  return (
    <div className="card-container">
      {courses.map((course) => (
        <Link
          to={`/courses/${slugify(course.title)}`}
          className="card-link"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div
            className={`card ${hoveredCourseId === course.id ? "hovered" : ""}`}
            key={course.id}
            onMouseEnter={() => handleMouseEnter(course.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="image-wrapper">
              <img
                src={`http://localhost:5002/api/files/zahet9k8sqf34u9/${course.id}/${course.image}?token=`}
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
                   window.location.href = `/courses/${slugify(course.title)}/purchase`;
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
