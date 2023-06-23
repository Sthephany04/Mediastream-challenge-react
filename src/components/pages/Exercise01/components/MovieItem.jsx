import React from "react";
import "../assets/styles.css";

export const MovieItem = ({ id, name, price, handleAddCart }) => {
  return (
    <li className="movies__list-card">
      <ul>
        <li>ID: {id}</li>
        <li>Name: {name}</li>
        <li>Price: ${price}</li>
      </ul>
      <button onClick={() => handleAddCart({ id, name, price })}>
        Add to cart
      </button>
    </li>
  );
};
