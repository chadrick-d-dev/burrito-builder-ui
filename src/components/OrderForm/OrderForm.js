import React, { Component } from 'react';
import { postOrder } from '../../apiCalls.js';
class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    }
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.clearInputs();
  }

  handleNameChange = (e) => {
    let name = e.target.name
    this.setState({ [name]: e.target.value })
  }

  handleIngredientChange= (e) => {
    const name = e.target.name
    let ingredientsArray = this.state.ingredients;
    
    if (ingredientsArray.length < 1) {
      e.preventDefault()
      ingredientsArray.push(name);
      this.setState({ ingredients: ingredientsArray })
    } else if ((ingredientsArray.length > 0) && !ingredientsArray.includes(name)) {
      e.preventDefault()
      ingredientsArray.push(name);
      this.setState({ ingredients: ingredientsArray })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length > 0) {
      postOrder(this.state.name, this.state.ingredients)
      this.clearInputs()
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream']
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={(e) => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
