import React from "react";

function Avatar({ img, name, className = "" }) {
  const handleImageError = (e) => {
    // Fallback to a placeholder if the image fails to load
    e.target.src = "https://via.placeholder.com/120x120/FFD700/000000?text=👤";
  };

  return (
    <img 
      className={`circle-img ${className}`}
      src={img}
      alt={`${name} avatar`}
      onError={handleImageError}
    />
  );
}

export default Avatar; 