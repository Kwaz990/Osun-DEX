import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
//import truffleContract from "truffle-contract";
import TruffleContract from 'truffle-contract'
import PropTypes from 'prop-types';
import DEXTokenSale from './build/contracts/DEXTokenSale.json';
import DEX_token from './build/contracts/DEX_token.json';

import parseLinkHeader from 'parse-link-header';
import orderBy from 'lodash/orderBy';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Loader from './components/Loader';

import * as API from './shared/http';
import Ad from './components/ad/Ad';
import Post from './components/post/Post';
import Welcome from './components/welcome/Welcome';

import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';

//import DashboardContainer from './components/DashboardContainer'

import "./App.css";

import Web3 from 'web3';

const $ = window.$;

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
web3.eth.getAccounts().then(console.log);


console.log("App.js loaded")

//Web3 = require('web3')

class App extends Component {

constructor(props) {
    super(props)
    this.state = {
    web3Provider: null,
    contracts: {},
    account: '0x0',
    loading: false,
    tokenPrice: 1000000000000000,
    tokensSold: 0,
    tokensAvailable: 750000,
    error: null,
    loading: false,
    posts: [],
    endpoint: `${process.env
        .ENDPOINT}/posts?_page=1&_sort=date&_order=DESC&_embed=comments&_expand=user&_embed=likes`,
};
  this.getPosts = this.getPosts.bind(this);
}
static propTypes = {
  children: PropTypes.node,
};
componentDidMount() {
  this.getPosts();
}
componentDidCatch(err, info) {
  console.error(err);
  console.error(info);
  this.setState(() => ({
      error: err,
  }));
}
getPosts() {
  API.fetchPosts(this.state.endpoint)
      .then(res => {
          return res.json().then(posts => {
              const links = parseLinkHeader(res.headers.get('Link'));
              this.setState(() => ({
                  posts: orderBy(this.state.posts.concat(posts), 'date', 'desc'),
                  endpoint: links.next.url,
              }));
          });
      })
      .catch(err => {
          this.setState(() => ({ error: err }));
      });
}

/*
if (typeof web3 != 'undefined') {
  this.web3Provider = web3.currentProvider
} else {
this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
}

this.web3 = new Web3(this.web3Provider)

this.DEXToken = TruffleContract(DEX_token)
this.DEXToken.setProvider(this.web3Provider)

this.DEXTokenSale = TruffleContract(DEXTokenSale)
this.DEXTokenSale.setProvider(this.web3Provider)
*/


render() {
  if (this.state.error) {
      return (
          <div className="app">
              <ErrorMessage error={this.state.error} />
          </div>
      );
  }
  return (
    <Router>
      <div className="app">
          <Nav user={this.props.user} />
          {this.state.loading ? (
              <div className="loading">
                  <Loader />
              </div>
          ) : (
              <div className="home">
                  <Welcome key="welcome" />
                  <div>
                      {this.state.posts.length && (
                          <div className="posts">
                              {this.state.posts.map(({ id }) => {
                                  return <Post id={id} key={id} user={this.props.user} />;
                              })}
                          </div>
                      )}
                      <button className="block" onClick={this.getPosts}>
                          Load more posts
                      </button>
                  </div>
                  <div>
                      <Ad
                          url="https://ifelse.io/book"
                          imageUrl="/static/assets/ads/ria.png"
                      />
                      <Ad
                          url="https://ifelse.io/book"
                          imageUrl="/static/assets/ads/orly.jpg"
                      />
                  </div>
              </div>
          )}
          <Route path ="/" render = {
            () => {
              return (<h1>its working </h1>);}} />
          <App />
      </div>
      </Router>
  )

}


}






  /*  initWeb3: function() {
      if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by Meta Mask.
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
      }
      return App.initContracts();
    },
  */

/*
 componentDidMount() {
  try {
    // Get network provider and web3 instance.
   // const web3 = await getWeb3();

    // Use web3 to get the user's accounts.
   // const accounts = await web3.eth.getAccounts();

    // Get the contract instance.
    const Contract = TruffleContract(SimpleStorageContract);
    Contract.setProvider(web3.currentProvider);
    const instance = Contract.deployed();

    // Set web3, accounts, and contract to the state, and then proceed with an
    // example of interacting with the contract's methods.
    this.setState({ web3, accounts, contract: instance }, this.runExample);
  } catch (error) {
    // Catch any errors for any of the above operations.
    alert(
      `Failed to load web3, accounts, or contract. Check console for details.`
    );
    console.log(error);
  };
 }
*/
/*    function(initContracts) {
      $.getJSON("DEXTokenSale.json", function(DEXTokenSale) {
        App.contracts.DEXTokenSale = TruffleContract(DEXTokenSale);
        App.contracts.DEXTokenSale.setProvider(App.web3Provider);
        App.contracts.DEXTokenSale.deployed().then(function(DEXTokenSale) {
          console.log("DEX Token Sale Address:", DEXTokenSale.address);
        });
      }).done(function() {
        $.getJSON("DEX_token.json", function(DEX_token) {
          App.contracts.DEX_token = TruffleContract(DEX_token);
          App.contracts.DEX_token.setProvider(App.web3Provider);
          App.contracts.DEX_token.deployed().then(function(DEX_token) {
            console.log("DEX Token Address:", DEX_token.address);
          });
  
          App.listenForEvents();
          return App.render();
        });
      })
    };
  */
    // Listen for events emitted from the contract
  /*  function(listenForEvents) {
      App.contracts.DEXTokenSale.deployed().then(function(instance) {
        instance.Sell({}, {
          fromBlock: 0,
          toBlock: 'latest',
        }).watch(function(error, event) {
          console.log("event triggered", event);
          App.render();
        })
      })
    };
  
    function() {
      if (App.loading) {
        return;
      }
      App.loading = true;
  
      var loader  = $('#loader');
      var content = $('#content');
  
      loader.show();
      content.hide();
  
      // Load account data
      web3.eth.getCoinbase(function(err, account) {
        if(err === null) {
          App.account = account;
          $('#accountAddress').html("Your Account: " + account);
        }
      })
  
      // Load token sale contract
    /*  App.contracts.DEXTokenSale.deployed().then(function(instance) {
       DEXTokenSaleInstance = instance;
        return DEXTokenSaleInstance.tokenPrice();
      }).then(function(tokenPrice) {
        App.tokenPrice = tokenPrice;
        $('.token-price').html(web3.fromWei(App.tokenPrice, "ether").toNumber());
        return DEXTokenSaleInstance.tokensSold();
      }).then(function(tokensSold) {
        App.tokensSold = tokensSold.toNumber();
        $('.tokens-sold').html(App.tokensSold);
        $('.tokens-available').html(App.tokensAvailable);
  */
       // var progressPercent = (Math.ceil(App.tokensSold) / App.tokensAvailable) * 100;
       // $('#progress').css('width', progressPercent + '%');
  
        // Load token contract
   /*     App.contracts.DEX_token.deployed().then(function(instance) {
          DEXTokenInstance = instance;
          return DEXTokenInstance.balanceOf(App.account);
        }).then(function(balance) {
          $('.DEX-balance').html(balance.toNumber());
          App.loading = false;
          loader.hide();
          content.show();
        })
      });
    };
  */
  /*  function() {
      $('#content').hide();
      $('#loader').show();
      var numberOfTokens = $('#numberOfTokens').val();
      App.contracts.DEXTokenSale.deployed().then(function(instance) {
        return instance.buyTokens(numberOfTokens, {
          from: App.account,
          value: numberOfTokens * App.tokenPrice,
          gas: 500000 // Gas limit
        });
      }).then(function(result) {
        console.log("Tokens bought...")
        $('form').trigger('reset') // reset number of tokens in form
        // Wait for Sell event
      });
    }
  };
  /*
  $(function() {
    $(window).load(function() {
      App.init();
    })
  });
*/






/*
  render () {
    return (
      <div>
        <App />
      
      </div>
    );
  };
 };
*/
export default App;
