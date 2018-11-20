import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

















//import Layout from "./components/Layout";

const node = document.getElementById("root");

const data = {
  recentBuyOrders: [
    {
      id: 0,
      Amount: 12345,
      Price: 0.01
    },
    {
      id: 1,
      user: 6789,
      content: 200
    },
  ]
}




class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      Amount: '',
      Price: ''
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAmountChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      Amount: val
    }));
  }
  handlePriceChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      Price: val
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.onBuySubmit({
      Amount: this.state.Amount.trim(),
      Price: this.state.Price.trim()
    });
    this.setState(() => ({
      Amount: '',
      Price: ''
    }));
  }
  render() {
    return (
      <form onSubmit ={this.handleSubmit} className ="Buy">
        <input 
          value={this.state.Amount}
          onChange={this.handleAmountChange}
          placeholder="Amount of Crypto to Buy"
          type="number"
          />
        <input 
          value={this.state.Price}
          onChange={this.handlePriceChange}
          placeholder="Buy Price"
          typer="number"
          />
        <button type="submit">Buy</button>
      </form>
    );
  }; 
}

class RecentBuyOrdersBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buyOrders: this.props.buyOrders
    };
    this.handleRecentBuys = this.handleRecentBuys.bind(this);
  }
  handleRecentBuys(buyOrders) {
    const orders = this.state.orders;
    orders.id = Date.now();
    const newBuys = orders.concat([orders]);
    this.setState({
        orders: newBuys
    });
  }
  render() {
      return(
        <div className = "recentBuyOrdersBox">
        <Buy
          id={this.props.Amount.id}
          Amount={this.props.Buy.Amount}
          Price={this.props.Buy.Price}
          />
          {this.state.recentBuyOrders.map(function(buyOrders) {
            return (
                <Buy 
                  key = {buyOrders.id}
                  Amount={buyOrders.Amount}
                  Price={buyOrders.Price}
                />
            );
          })}
          <Buy onBuySubmit={this.handleRecentBuys} />  
        </div>
      )
  }
}




class Sell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      Amount: '',
      Price: ''
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAmountChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      Amount: val
    }));
  }
  handlePriceChange(event) {
    const val = event.target.value;
    this.setState(() => ({
      Price: val
    }));
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState(() => ({
      Amount: '',
      Price: ''
    }));
  }
  render() {
    return (
      <form onSubmit ={this.handleSubmit} className ="Sell">
        <input 
          value={this.state.Amount}
          onChange={this.handleAmountChange}
          placeholder="Amount of Crypto to Sell"
          type="number"
          />
        <input 
          value={this.state.Price}
          onChange={this.handlePriceChange}
          placeholder="Sell Price"
          typer="number"
          />
        <button type="submit">Sell</button>
      </form>
    );
  }; 
}











render(
  <div>
    <Buy/>
    <Sell/>
  </div>, node);
  