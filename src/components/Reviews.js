import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "./Reviews.css";

const Reviews = ({ reviews }) => {
  const navigate = useNavigate();
  const [visibleReviews, setVisibleReviews] = useState(3);

  const reviewsArray = reviews.reviews;

  const handleSeeMore = () => {
    if (visibleReviews >= reviewsArray.length) {
      navigate("/courses/reviews");
    } else {
      setVisibleReviews(visibleReviews + 3);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <ul>
        {reviewsArray.slice(0, visibleReviews).map((review, index) => (
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
            <p className="rating-author">{review.author}</p>
            <p>{review.description}</p>
          </li>
        ))}
      </ul>
      {reviewsArray.length > visibleReviews && (
        <button onClick={handleSeeMore}>See more reviews</button>
      )}
    </div>
  );
};

export default Reviews;
