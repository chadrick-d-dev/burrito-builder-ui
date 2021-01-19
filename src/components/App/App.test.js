import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import userEvent from '@testing-library/user-event';
import { getOrders, postOrder, postOrders } from '../../apiCalls';
jest.mock('../../apiCalls.js');

describe('App', () => {
  // beforeEach(() => {
    // getOrders.mockResolvedValueOnce = {
    //   "orders": [
    //   {
    //     "id": 1,
    //     "name": "Pat",
    //     "ingredients": [
    //       "beans",
    //       "lettuce",
    //       "carnitas",
    //       "queso fresco",
    //       "jalapeno"
    //     ]
    //   },
    //   {
    //     "id": 2,
    //     "name": "Sam",
    //     "ingredients": [
    //       "steak",
    //       "pico de gallo",
    //       "lettuce",
    //       "carnitas",
    //       "queso fresco",
    //       "jalapeno"
    //     ]
    //   }
    // ]}
  //   render(
  //     <App />
  //   )
  // })
  it('should render an app Title', () => {
    getOrders.mockResolvedValueOnce({"orders": 
      [
        {
          "id": 1,
          "name": "Pat",
          "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
          ]
        },
        {
          "id": 2,
          "name": "Sam",
          "ingredients": [
              "steak",
              "pico de gallo",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
          ]
        }
      ]
    })
    render(
      <App />
    )
    const title = screen.getByText('Burrito Builder')
    expect(title).toBeInTheDocument()
  })
  it('should render OrderForm', () => {
    getOrders.mockResolvedValueOnce({
      "orders":
        [
          {
            "id": 1,
            "name": "Pat",
            "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          },
          {
            "id": 2,
            "name": "Sam",
            "ingredients": [
              "steak",
              "pico de gallo",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          }
        ]
    })
    render(
      <App />
    )
    const nameInput = screen.getByPlaceholderText('Name')
    const beans = screen.getByText('beans')
    const submitButton = screen.getByText('Submit Order')
    expect(nameInput).toBeInTheDocument()
    expect(beans).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
  it('should render orders', async () => {
    getOrders.mockResolvedValueOnce({
      "orders":
        [
          {
            "id": 1,
            "name": "Pat",
            "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          },
          {
            "id": 2,
            "name": "Sam",
            "ingredients": [
              "steak",
              "pico de gallo",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          }
        ]
    })
    render(
      <App />
    )
    const orderOne = await waitFor(() => screen.getByText('Pat'))
    const orderTwo = await waitFor(() => screen.getByText('Sam'))
    expect(orderOne).toBeInTheDocument()
    expect(orderTwo).toBeInTheDocument()
  })
  it('should display new order when order has been submitted', async () => {
    getOrders.mockResolvedValueOnce({
      "orders":
        [
          {
            "id": 1,
            "name": "Pat",
            "ingredients": [
              "beans",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          },
          {
            "id": 2,
            "name": "Sam",
            "ingredients": [
              "steak",
              "pico de gallo",
              "lettuce",
              "carnitas",
              "queso fresco",
              "jalapeno"
            ]
          }
        ]
    })
    postOrder.mockResolvedValueOnce({
      id: 1,
      name: "Eric",
      ingredients: ["beans"]
    })
    render(
      <App />
    )
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Eric' } })
    const beans = screen.getByText('beans')
    userEvent.click(beans)
    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)
    const orderEric = await waitFor(() => screen.getByText('Eric'))
    expect(orderEric).toBeInTheDocument()
  })
  it.skip('should render ', () => {
    const quoterTab = screen.getByText('')
    const stashTab = screen.getByText('')
    expect(quoterTab).toBeInTheDocument()
    expect(stashTab).toBeInTheDocument()
  })
})