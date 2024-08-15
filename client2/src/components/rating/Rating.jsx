import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Rating = ({ rating }) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="rating">
      {[...Array(filledStars)].map((_, index) => (
        <FontAwesomeIcon key={index} icon={solidStar} style={{ color: 'gold' }} />
      ))}
      {hasHalfStar && <FontAwesomeIcon icon={solidStar} style={{ color: 'gold' }} />}
      {[...Array(5 - filledStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <FontAwesomeIcon key={index} icon={regularStar} style={{ color: 'gold' }} />
      ))}
    </div>
  );
};

export default Rating;
