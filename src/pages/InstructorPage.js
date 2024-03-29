import React from "react";
import { Link } from "react-router-dom";
import slugify from "slugify";
import "./InstructorPage.css";
import Instructor from "../api/models/Instructor";
import { RxAvatar } from "react-icons/rx";

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
                <RxAvatar className="profile-photo-circle" />
              )}
            </div>
            <div className="social-media-container">
              {instructor.social_media && Array.isArray(instructor.social_media) ? (
                instructor.social_media.map((link, index) => (
                  <div key={index}>
                    <a href={link.url} className="social-media-links">{link.text}</a>
                  </div>
                ))
              ) : null}
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