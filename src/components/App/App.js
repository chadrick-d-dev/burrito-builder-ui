import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super()
    this.state = {
      orders: [] 
    }
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({orders:orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  // componentDidUpdate() {
  //   getOrders()
  //     .then(orders => this.setState({ orders: orders.orders }))
  //     .catch(err => console.error('Error fetching:', err));
  // }

  takeOrder= (newOrder) => {
    this.setState({orders:[...this.state.orders, newOrder]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm takeOrder={this.takeOrder} postOrder={postOrder} />
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
