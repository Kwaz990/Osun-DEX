import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

//import  App  from './App';
//import { home } from './pages/home';
//import Router from './components/router/Router';
//import Route from './components/router/Route';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Route from 'react-router-dom/Route';
//import { history } from './history/history'; 
//import Navigation from './components/nav/navbar';
import './App.css';

import { Web3Provider } from 'react-web3';

//import * as api from './api'

//import Index from './components/Index';

//import RouterLink from './components/router/Link'; 

//import Layout from "./components/Layout";
/*
export const renderApp = (state, callback = () => {}) => {
  render(
    <Router {...state}>
    <Route path="" component={App}>
    <Route path="/" component={home} />
    </Route>
    </Router>,
    document.getElementById('app'),
    callback
    );
 };
*/

/*
 let state = {
  location: window.location.pathname,
 }; 



 history.listen(location => {
  state = Object.assign({}, state, {
  location: location.pathname
  });
  renderApp(state);
 });

*/
 //renderApp(state);



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

class Navbar extends Component {
  render(){
    return(
  <div>
    Osun DEX: 
    <ul>
    <Link to = "/">Home</Link>
    <Link to = "/Buy">Buy</Link>
    <Link to = "/Sell">Sell</Link>
    <Link to = "/Dash">Dashboard</Link>
    <Link to = "/TokenSale">Osun Token Sale</Link>
    </ul>
</div>
    );
}
}


class Buy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue',
      bool: 'False',
      Amount: 0.00,
      Price: 0.00
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
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

  /* build a function that executes the following 'cross-env yarn build && node ./lib/scenarios/fill_order_erc20.js' 
  and link it to the buy function

  use shell.exec('./path_to_ur_file')
  use shell.exec('yarn scenario:fill_order_erc20')
  use shell.exec('cross-env yarn build && node ./lib/scenarios/fill_order_erc20.js')
  use a blooblean for your state change and pass a conosle.log message to confirm everything went well

  */


  //statless functional button click

  /* function onButtonClick() {
     return 
    this.setState(() => ({
      color:'green',
      bool: 'True'
   // shell.exec('yarn scenario:fill_order_erc20'),
    console.log(command succesfully executed!)
  }))
}
 
*/


  onButtonClick() {
    this.setState(() => ({
      color:'green',
      bool: 'True',
     // shell.exec('yarn scenario:fill_order_erc20'),
     //console.log(command succesfully executed!)
    }))
  }

  handleSubmit(event) {
    event.preventDefault();
    /*this.props.onButtonClick({
      Amount: this.state.Amount,
      Price: this.state.Price
    });*/
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
        <button onClick={this.onButtonClick} type="submit">Buy</button>
      </form>
    );
  }; 
}
export default Buy

class RecentBuyOrdersBox extends Buy {
  constructor(props) {
    super(props);
    this.state = {
        buyOrders: []  //this.props.buyOrders
    };
    this.handleRecentBuys = this.handleRecentBuys.bind(this);
  }
  handleRecentBuys(buyOrders) {
    const buyorders = this.state.orders;
    buyorders.id = Date.now();
    const newBuys = buyorders.concat([buyorders]);
    this.setState({
        buyorders: newBuys
    });
  }
  render() {
      return(
        <div className = "recentBuyOrdersBox">
        <recentBuy
         // id={this.props.Buy.id}
          Amount={this.props.Amount}
          Price={this.props.Price}
          />
          {this.state.buyOrders.map(function(buyOrders) {
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

class DashboardContainer extends Component {
  constructor() {
    super()
    this.state = {
      listings: [],
      ticker: [],
      global: []
    }
  }

  // callAPIsContinously() {
  //   console.log("Hello!!!");
  //
  //   setInterval( () => {
  //     api.getTicker().then(response => this.setState({
  //       ticker: Object.values(response) //converting object into array
  //     }))}, 2000)
  //
  //   setInterval( () => {
  //     api.getGlobal().then(response => this.setState({
  //       global: Object.values(response) //converting object into array
  //     }))}, 2000)
  //
  //     setInterval(function(){ console.log("Hello again!!!"); }, 1000)
  //   }


  //componentDidMount() {
   // console.log('componentDidMount, making API calls...')

    // this.callAPIsContinously()
/*
    api.getTicker()
    .then(response => this.setState({
      ticker: Object.values(response) //converting object into array
    }))
*/
/*
    api.getGlobal()
    .then(response => this.setState({
      global: Object.values(response) //converting object into array
    }))
    console.log('step 2, setting state with responses from API call promises...')
  }
*/
 /* scrollToTop() {
    console.log('scrollToTop called...')
    window.scrollTo(0, 0)
    window.history.pushState("object or string", "Title", "/");
  }
  
 */
  render() {
    console.log('this.state is: ' , this.state)
    return (
      <div className="center">
        <header className="DashboardContainer-header">
          <h1>Welcome to Osun DEX</h1>
        </header>
        <p className="DashboardContainer-intro">
          Please loggin with MetaMask
        </p>


      </div>
    );
  }
  };


/*class TokenSalePage extends Component {
  render() {
    return (

 
    );
  }
}

*/






render(
  
  <Router>
  <div>
    <Navbar/>
    <RecentBuyOrdersBox/>
    <Route path="/Buy" component={Buy}/>
    <Route path="/Sell" component={Sell}/>
    <Web3Provider>
    <Route path="/Dash" component={DashboardContainer}/>
    </Web3Provider>
  </div>
  </Router>
  , node);
  