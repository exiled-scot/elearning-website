import React, { useState } from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import "./Card.css";

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
        <div
          className={`card ${hoveredCourseId === course.id ? "hovered" : ""}`}
          key={course.id}
          onMouseEnter={() => handleMouseEnter(course.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="image-wrapper">
            <img
              src={`http://localhost:5002/api/files/at7b3ntpxm6n6r1/${course.id}/${course.image}?token=`}
              alt="image"
              className="card-image"
            />
            <div className="image-overlay"></div>
          </div>
          <div className="wrapper">
            <div className="content">
              <h2 className="title">
                <Link to={`/courses/${slugify(course.title)}`}>
                  {course.title}
                </Link>
              </h2>
              <p className="instructor">{course.instructor}</p>
              <p className="text">{course.description}</p>
            </div>
            <ul className="menu-content">
              <li>
                <a href="#">
                  <i className="fa fa-book"></i>Read more
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-tasks"></i>Course Outline
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-pencil"></i>Buy this course
                </a>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
