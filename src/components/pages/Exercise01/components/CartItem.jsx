import React from "react";
import "../assets/styles.css";

export const CartItem = ({
  id,
  name,
  price,
  quantity,
  handleChangeQuantity,
}) => {
  return (
    <li className="movies__cart-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <div className="movies__cart-card-quantity">
        <button onClick={() => handleChangeQuantity(id, -1)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => handleChangeQuantity(id, 1)}>+</button>
      </div>
    </li>
  );
};
