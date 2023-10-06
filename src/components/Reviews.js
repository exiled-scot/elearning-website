import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import "./Reviews.css";

const Reviews = ({ reviews }) => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const navigate = useNavigate();

  const handleSeeMore = () => {
    if (visibleReviews >= reviews.length) {
      navigate("/courses/reviews");
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
            <div className="review-header">
              <h3 className="review-title">{review.title}</h3>
              <StarRatings
                rating={review.rating}
                starRatedColor="blue"
                starDimension="20px"
                starSpacing="2px"
              />
            </div>
            <p>{review.description}</p>
            <p className="rating-author">{review.author}</p>
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
