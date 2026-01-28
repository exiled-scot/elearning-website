import React from 'react';
import Card from '../components/Card';
import './Explore.css';

const Explore = ({ courses }) => {
  return (
    <div className="explore-container">
      <h2>Explore Courses</h2>
      <p className="explore-subtitle">Browse our catalog of {courses.length} courses</p>
      <Card courses={courses} />
    </div>
  );
};

export default Explore;
