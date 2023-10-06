import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Link, useNavigate } from 'react-router-dom';

const Reviews = ({ reviews, course }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const navigate = useNavigate();

  const handleSeeMore = () => {
    if (visibleReviews >= reviews.length) {
      navigate('/courses/reviews');
    } else {
      setVisibleReviews(visibleReviews + 3);
    }
  };

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
        {reviews.slice(0, visibleReviews).map((review, index) => (
          <li key={index}>
            <h3>{review.title}</h3>
            <p>{review.description}</p>
            <p>
              <StarRatings
                rating={review.rating}
                starRatedColor="blue"
                starDimension="20px"
                starSpacing="2px"
              />
            </p>
            <p>Author: {review.author}</p>
          </li>
        ))}
      </ul>
      {reviews.length > visibleReviews && (
        <button onClick={handleSeeMore}>See more reviews</button>
      )}
    </div>
  );
};

export default Reviews;
