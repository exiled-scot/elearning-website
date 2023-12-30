import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import "./InstructorPage.css";

const InstructorPage = ({ instructor }) => {
  return (
    <>
      <div className="instructor-profile--page-container--1oU4J">
        <div className="instructor-profile--wrapper">
          <div className="instructor-profile--sidebar--1hqU2">
            <div className="profile-photo-wrapper">
              {instructor.profilePhoto ? (
                <img className="profile-photo instructor-profile--instructor-image--1wMLG" src={"http://localhost:5002/api/files/wzfknx3j0upbldh/" + instructor.id + "/" + instructor.profilePhoto} alt="Profile Photo" />
              ) : (
                <div className="profile-photo-circle"></div>
              )}
            </div>
            <div className="social-media-container">
              <div>
                <a href="/" className="social-media-links">Website</a>
              </div>
              <div>
                <a href="https://twitter.com" className="social-media-links">Twitter</a>
              </div>
              <div>
                <a href="https://linkedin.com" className="social-media-links">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="instructor-profile--content-wrapper">
            <div className="instructor-profile--main-content--3LQXY">
              <div className="instructor-profile--instructor-info--1-iYp">
                <h3 className="instructor-profile--instructor-heading--3Lp_v">INSTRUCTOR</h3>
                <h1 className="instructor-profile--instructor-title--1L6bi">{instructor.name}</h1>
                <h3>{instructor.title}</h3>
              </div>
              <div className="instructor-profile--about-me--3D60O">
                <h2>About Me</h2>
                {instructor.about.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
              <div className="courses">
                <h3>Courses (#):</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorPage;
