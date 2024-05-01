import React, { useState, useEffect } from "react";
import Reviews from "../components/Reviews";
import "./ProductPage.css";
import ReadMore from "../components/ReadMore";
import Requirements from "../components/Requirements";
import slugify from "slugify";

const CourseTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

const CourseImage = ({ id, image }) => {
  const imageUrl = `http://localhost:5002/api/files/h0ynbdfoqmz1vn8/${id}/${image}?token=`;

  return <img src={imageUrl} alt="image" className="card-image" />;
};

const CourseContent = ({ content }) => {
  if (content === null) {
    return null;
  }

  let parsedContent;

  try {
    parsedContent = content;
  } catch (error) {
    console.error('Error parsing content:', error);
    parsedContent = {};
  }

  const courseContentList = parsedContent.content?.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  if (parsedContent?.content?.length > 0) {
    return (
      parsedContent.content && (
        <div>
          <h2>What You'll Learn</h2>
          <ul>{courseContentList}</ul>
        </div>
      )
    );
  }

  return null;
};

async function fetchInstructorData(instructor_id) {
  const url = `http://localhost:5002/api/collections/instructors/records/${instructor_id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

const BuyCourse = ({ course }) => {
  const { id, image } = course;

  return (
    <div className="buy-course--sidebar">
      <CourseImage id={id} image={image} />
      <div className="image-overlay">
        <p>Preview this course</p>
      </div>
      <button className="buy-button button-effect">Buy this course</button>
      <div className="sidebar-actions">
        <div className="share-action">
          <button className="share-button button-effect">Share</button>
        </div>
        <div className="gift-action">
          <button className="gift-button button-effect">Gift this course</button>
        </div>
        <div className="coupon-action">
          <button className="coupon-button button-effect">Apply Coupon</button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ course }) => {
  const { title, id, instructors, image, content, description, requirements, reviews } = course;
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    const fetchInstructorsData = async () => {
      const data = await Promise.all(instructors.map(instructor_id => fetchInstructorData(instructor_id)));
      setInstructorData(data);
    };

    fetchInstructorsData();
  }, [instructors]);

  const displayInstructors = () => {
    if (instructorData.length === 0) {
      return null;
    }

    const instructorLinks = instructorData.map((instructor, index) => (
      <React.Fragment key={index}>
        <a href={`/instructors/${slugify(instructor.name)}`} style={{ textDecoration: 'underline', color: 'blue' }}>
          {instructor.name}
        </a>
        {index !== instructorData.length - 1 ? (index !== instructorData.length - 2 ? ", " : " and ") : ""}
      </React.Fragment>
    ));

    return instructorLinks;
  };

  return (
    <div>
      <CourseImage id={id} image={image} />
      <CourseTitle title={title} />
      <div>
        Created by: {displayInstructors()}
      </div>
      <CourseContent content={content} />
      <ReadMore>{description}</ReadMore>
      <Requirements requirements={requirements} />
      <Reviews reviews={reviews} />
      <BuyCourse course={course} />
    </div>
  );
};

export default ProductPage;
