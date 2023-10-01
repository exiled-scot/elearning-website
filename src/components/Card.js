import React from "react";
import "./Card.css";

const Card = ({ courses }) => {
  if (!courses) return null;

  return (
    <div className="card-container">
      {courses.map((course) => (
        <div className="card" key={course.id}>
          <img src="placeholder.jpg" alt="Course Image" />
          <div className="wrapper">
            <div className="content">
              <h2 className="title">
                <a href="#">{course.title}</a>
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
