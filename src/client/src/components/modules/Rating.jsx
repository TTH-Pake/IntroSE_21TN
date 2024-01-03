import React, { useState } from "react";

const Rating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    onRate(selectedRating);
  };

  return (
    <div  style={{ textAlign: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
            fontSize: "50px", // Đặt kích thước của ngôi sao ở đây
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
