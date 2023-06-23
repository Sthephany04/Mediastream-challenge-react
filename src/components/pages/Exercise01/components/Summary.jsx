import React from "react";
import "../assets/styles.css";

export const Summary = ({ discount, subtotal, total }) => {
  return (
    <div className="movies__cart-total">
      {discount !== 0 && (
        <>
          <p>Subtotal: ${subtotal}</p>
          <p>Descuento: ${discount}</p>
        </>
      )}
      <p>Total: ${total}</p>
    </div>
  );
};
