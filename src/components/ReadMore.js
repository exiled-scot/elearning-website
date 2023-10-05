import React, { useState } from "react";
import "../App.css";

const ReadMore = ({ children }) => {
  const text = children;
  const paragraphs = text.split("\n").map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      {isReadMore ? paragraphs.slice(0, 2) : paragraphs}
      {paragraphs.length > 2 && (
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
