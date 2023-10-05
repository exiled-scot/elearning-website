import React from "react";
import Reviews from "../components/Reviews";
import "./ProductPage.css";
import ReadMore from "../components/ReadMore";

const CourseTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

const CourseImage = ({ id, image }) => {
  const imageUrl = `http://localhost:5002/api/files/at7b3ntpxm6n6r1/${id}/${image}?token=`;

  return <img src={imageUrl} alt="image" className="card-image" />;
};

const CourseContent = ({ content }) => {
  const parsedContent = content instanceof Object ? content : JSON.parse(content);
  const courseContentList = parsedContent.course_contents.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  return (
    <div className="course-content-box">
      <h2>What you'll learn</h2>
      <ul>{courseContentList}</ul>
    </div>
  );
};

const ProductPage = ({ course }) => {
  const { title, id, image, content, description, reviews } = course;

  return (
    <div>
      <CourseTitle title={title} />
      <CourseImage id={id} image={image} />
      <CourseContent content={content} />
      <ReadMore>{description}</ReadMore>
    <Reviews reviews={Object.values(reviews)}/>
    </div>
  );
};

export default ProductPage;
