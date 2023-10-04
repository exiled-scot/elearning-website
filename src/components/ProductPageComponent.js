import React from "react";

const ProductPageComponent = ({ course }) => {
  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default ProductPageComponent;
