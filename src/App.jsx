import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./cartSlice";

export default function App() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.total);

  const products = [
    { id: 1, name: "Apple", price: 50 },
    { id: 2, name: "Banana", price: 20 },
    { id: 3, name: "Mango", price: 80 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Shopping Cart</h1>

      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id}>
          {product.name} - ₹{product.price}
          <button onClick={() => dispatch(addItem(product))} style={{ marginLeft: "10px" }}>
            Add
          </button>
        </div>
      ))}

      <hr />
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        items.map(item => (
          <div key={item.id}>
            {item.name} - ₹{item.price}
            <button onClick={() => dispatch(removeItem(item.id))} style={{ marginLeft: "10px" }}>
              Remove
            </button>
          </div>
        ))
      )}

      <h3>Total: ₹{total}</h3>
    </div>
  );
}
