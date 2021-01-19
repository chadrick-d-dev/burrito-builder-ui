import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from './OrderForm';
import userEvent from '@testing-library/user-event';
import { postOrders } from '../../apiCalls';
// jest.mock('../apiCalls.js');

describe('OrderForm', () => {
  beforeEach(() => {
    render(
      <OrderForm />
    )
  })
  it('should render a name input', () => {
    const nameInput = screen.getByPlaceholderText('Name')
    expect(nameInput).toBeInTheDocument()
  })
  it('should render ingredient buttons', () => {
    const beans = screen.getByText('beans')
    const steak = screen.getByText('steak')
    const carnitas = screen.getByText('carnitas')
    expect(beans).toBeInTheDocument()
    expect(steak).toBeInTheDocument()
    expect(carnitas).toBeInTheDocument()
  })
  it('should render text of Nothing selected before ingredient buttons have been clicked', () => {
    const nothing = screen.getByText('Order: Nothing selected')
    expect(nothing).toBeInTheDocument()
  })
  it('should not render text of Nothing selected when ingredient button has been clicked', () => {
    const beans = screen.getByText('beans')
    userEvent.click(beans)
    const nothing = screen.queryByText('Order: Nothing selected')
    expect(nothing).not.toBeInTheDocument()
  })
  it('should render selected ingredient when ingredient button has been clicked', () => {
    const beans = screen.getByText('beans')
    userEvent.click(beans)
    const order = screen.getByText('Order: beans')
    expect(order).toBeInTheDocument()
  })
  it('should clear order and name input on submit when user has given a name and clicked desired ingredients', () => {
   
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Tom' } })
    const name = screen.getByDisplayValue('Tom')
    expect(name).toBeInTheDocument()
    const beans = screen.getByText('beans')
    userEvent.click(beans)
    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)
    const nothing = screen.getByText('Order: Nothing selected')
    const nameInput = screen.getByPlaceholderText('Name')
    expect(nothing).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
  })
  it('should not clear name on submit if user has only given a name', () => {
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Tom' } })
    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)
    const nothing = screen.queryByText('Order: Nothing selected')
    const name = screen.getByDisplayValue('Tom')
    expect(nothing).toBeInTheDocument()
    expect(name).toBeInTheDocument()
  })
  it('should not clear order on submit if user has clicked on ingredients', () => {
    const beans = screen.getByText('beans')
    userEvent.click(beans)
    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)
    const order = screen.getByText('Order: beans')
    expect(order).toBeInTheDocument()
  })
})