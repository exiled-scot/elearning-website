import React from 'react';

const Reviews = ({ reviews }) => {
  if (reviews === null || !Array.isArray(reviews) || reviews.length === 0) {
    return (
      <div>
        <h3>Reviews</h3>
        <p>Write a review!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}>
            <h3>{review.title}</h3>
            <p>{review.description}</p>
            <p>Rating: {review.rating}/5</p>
            <p>Author: {review.author}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reviews;
