var DEX_token = artifacts.require("./DEX_token.sol");

var DEXTokenSale = artifacts.require("./DEXTokenSale.sol");

var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {

  deployer.deploy(SimpleStorage);

  deployer.deploy(DEX_token, 10000000).then(function() {
    //Toke price is 0.001 Ether
    var tokenPrice = 1000000000000000;
    return deployer.deploy(DEXTokenSale, DEX_token.address, tokenPrice);
  });
  
};



