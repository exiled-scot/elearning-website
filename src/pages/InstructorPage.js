import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import "./InstructorPage.css";

const InstructorPage = ({ instructor }) => {
  return (
    <>
      <div className="first-column">
        <div className="instructor-info">
          <h3>INSTRUCTOR</h3>
          <h1>{instructor.name}</h1>
          <h3>{instructor.title}</h3>
        </div>
        <div className="about-container">
          <h2>About Me</h2>
          {instructor.about.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
      <div className="second-column">
        <div className="instructor-image-div">
          {instructor.profilePhoto ? (
            <img src={instructor.profilePhoto} alt="Profile Photo" />
          ) : (
            <div className="profile-photo-circle"></div>
          )}
        </div>
        <div className="social-media-container">
          <p className="social-media-box">Website</p>
          <p className="social-media-box">Twitter</p>
          <p className="social-media-box">LinkedIn</p>
        </div>
      </div>
      <div className="courses">
        <h3>Courses (#):</h3>
      </div>
    </>
  );
};

export default InstructorPage;
