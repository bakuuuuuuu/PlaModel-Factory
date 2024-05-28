import React, { useState } from 'react';
import "../quantityInput/quantityInput.css"

const QuantityInput = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="quantity-input">
            <button onClick={handleDecrement}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
};

export default QuantityInput;
