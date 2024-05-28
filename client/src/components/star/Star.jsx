import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const Star = ({ filled, onClick }) => {
    return (
        <span onClick={onClick} style={{ cursor: 'pointer' }}>
            <FontAwesomeIcon icon={filled ? solidStar : regularStar} style={{ color: 'gold' }} />
        </span>
    );
};

export default Star;
