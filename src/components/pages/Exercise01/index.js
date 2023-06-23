/**
 * Exercise 01: The Retro Movie Store
 * Implement a shopping cart with the next features for the Movie Store that is selling retro dvds:
 * 1. Add a movie to the cart
 * 2. Increment or decrement the quantity of movie copies. If quantity is equal to 0, the movie must be removed from the cart
 * 3. Calculate and show the total cost of your cart. Ex: Total: $150
 * 4. Apply discount rules. You have an array of offers with discounts depending of the combination of movie you have in your cart.
 * You have to apply all discounts in the rules array (discountRules).
 * Ex: If m: [1, 2, 3], it means the discount will be applied to the total when the cart has all that products in only.
 *
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import { useMemo, useState } from "react";

import "./assets/styles.css";
import { DISCOUNT_RULES, MOVIES } from "./constants";
import { MovieItem } from "./components/MovieItem";
import { CartItem } from "./components/CartItem";
import { Summary } from "./components/Summary";

export default function Exercise01() {
  const [cart, setCart] = useState([]);

  const { subtotal, total, discount } = useMemo(() => {
    const subtotal = cart.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
    const discountFind = DISCOUNT_RULES.find(({ m }) => {
      if (m.length !== cart.length) {
        return false;
      }
      return cart.filter(({ id }) => m.includes(id)).length === cart.length;
    });

    const discount = discountFind ? discountFind.discount * subtotal : 0;
    return { subtotal, discount, total: subtotal - discount };
  }, [cart]);

  const handleChangeQuantity = (id, quantity) => {
    setCart(
      cart.reduce((acc, curr) => {
        if (curr.id === id) {
          const newQuantity = curr.quantity + quantity;
          return newQuantity === 0
            ? acc
            : [...acc, { ...curr, quantity: newQuantity }];
        }
        return [...acc, curr];
      }, [])
    );
  };

  const handleAddCart = (movie) => {
    const findItem = cart.find((item) => item.id === movie.id);

    if (findItem) {
      return handleChangeQuantity(movie.id, 1);
    }

    setCart([...cart, { ...movie, quantity: 1 }]);
  };

  return (
    <section className="exercise01">
      <div className="movies__list">
        <ul>
          {MOVIES.map(({ id, name, price }) => (
            <MovieItem
              key={id}
              id={id}
              name={name}
              price={price}
              handleAddCart={handleAddCart}
            />
          ))}
        </ul>
      </div>
      <div className="movies__cart">
        <ul>
          {cart.map(({ id, name, price, quantity }) => (
            <CartItem
              key={id}
              id={id}
              name={name}
              price={price}
              quantity={quantity}
              handleChangeQuantity={handleChangeQuantity}
            />
          ))}
        </ul>
        <Summary subtotal={subtotal} discount={discount} total={total} />
      </div>
    </section>
  );
}
