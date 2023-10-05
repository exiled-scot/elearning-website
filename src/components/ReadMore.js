import React, { useState } from 'react';

const ReadMore = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  // Extract the first 2 paragraphs from the text
  const paragraphs = text.split('\n').slice(0, 2).join('\n');
  // Check if there are remaining paragraphs
  const shouldShowReadMore = text.split('\n').length > 2;

  const handleReadMoreClick = () => {
    setShowFullText(true);
  };

  return (
    <>
      {shouldShowReadMore ? (
        <>
          {showFullText ? (
            <p>{text}</p>
          ) : (
            <>
              <p>{paragraphs}</p>
              <p onClick={handleReadMoreClick} className="read-more-link">Read More</p>
            </>
          )}
        </>
      ) : (
        <p>{text}</p>
      )}
    </>
  );
};

export default ReadMore;
