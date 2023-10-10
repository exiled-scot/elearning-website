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
    parsedContent = content;
  } catch (error) {
    console.error('Error parsing content:', error);
    parsedContent = {};
  }
  const courseContentList = parsedContent.course_content?.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  if (parsedContent?.course_content?.length > 0) {
    return (
      parsedContent.course_content && (
        <div className="two-column-list">
          <h2>What You'll Learn:</h2>
          <ul>{courseContentList}</ul>
        </div>
      )
    );
  }

  return null;
};

const ProductPage = ({ course }) => {
  const { title, id, instructor, image, content, description, requirements, reviews } = course;

  return (
    <div>
      <CourseImage id={id} image={image} />
      <CourseTitle title={title} />
      <div>
        <h2>{description.match(/^.+?[.!?](\s|$)/)[0]}</h2>
      </div>
      <div>
        Created by <a href={`/users/${encodeURIComponent(instructor)}`}>{instructor}</a>
      </div>
      <CourseContent content={content} className="course-requirements" />
      <ReadMore>{description}</ReadMore>
      <Requirements requirements={requirements} />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;
