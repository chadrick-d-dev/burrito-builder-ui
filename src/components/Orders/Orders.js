import React from 'react';
import './Orders.css';

const Orders = props => {
  const orders = props.orders.map(order => {
    return (
      <div className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li>{ingredient}</li>
          })}
        </ul>
      </div>
    )
  });

  return (
    <section>
      { orders.length ? orders : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;