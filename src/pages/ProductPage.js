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

const CourseContent = ({ contents }) => {
  if (contents === null) {
    return null;
  }

  let parsedContents;

  try {
    parsedContents = contents instanceof Object ? contents : JSON.parse(contents);
  } catch (error) {
    console.error('Error parsing requirements:', error);
    parsedContents = {};
  }
  const courseContentsList = parsedContents.course_contents?.map((item, index) => (
    <li key={index}>{item}</li>
  ));

  if (parsedContents?.course_contents?.length > 0) {
    return (
      parsedContents.course_contents && (
        <div>
          <h2>What You'll Learn:</h2>
          <ul>{courseContentsList}</ul>
        </div>
      )
    );
  }

  return null;
};

const ProductPage = ({ course }) => {
  const { title, id, image, content, description, requirements, reviews } = course;

  return (
    <div>
      <CourseTitle title={title} />
      <CourseImage id={id} image={image} />
      <CourseContent content={content} />
      <ReadMore>{description}</ReadMore>
      <Requirements requirements={requirements} />
      <Reviews reviews={reviews} />
    </div>
  );
};

export default ProductPage;
