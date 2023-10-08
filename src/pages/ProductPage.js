import React from "react";
import Reviews from "../components/Reviews";
import "./ProductPage.css";
import ReadMore from "../components/ReadMore";
import Requirements from "../components/Requirements";

const CourseTitle = ({ title }) => {
  return <h1>{title}</h1>;
};

const CourseImage = ({ id, image }) => {
  const imageUrl = `http://localhost:5002/api/files/zahet9k8sqf34u9/${id}/${image}?token=`;

  return <img src={imageUrl} alt="image" className="card-image" />;
};

const CourseContent = ({ content }) => {
  if (content === null) {
    return null;
  }

  let parsedContent;

  try {
    parsedContent = content instanceof Object ? content : JSON.parse(content);
  } catch (error) {
    console.error('Error parsing content:', error);
    parsedContent = {};
  }

  const courseContentList = parsedContent.course_contents?.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  if (parsedContent?.course_contents?.length > 0) {
    return (
      parsedContent.course_contents && (
        <div className="course-content-box">
          <h2>What you'll learn</h2>
          <ul className="two-column-list">{courseContentList}</ul>
        </div>
      )
    );
  }
};

const ProductPage = ({ course }) => {
  const { title, id, image, content, description, requirements, reviews } = course;

  return (
    <div>
      <CourseTitle title={title} />
      <CourseImage id={id} image={image} />
      <CourseContent content={content} />
      <ReadMore>{description}</ReadMore>
     {/* <Reviews reviews={Object.values(reviews)} course={course} /> */}
    </div>
  );
};

export default ProductPage;
