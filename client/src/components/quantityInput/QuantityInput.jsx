import React, { useState } from 'react';
import "../quantityInput/quantityInput.css"

const QuantityInput = ({ value, onChange }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    return (
        <div className="quantity-input">
            <button onClick={handleDecrement}>-</button>
            <input type="text" value={value} readOnly />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityInput;
