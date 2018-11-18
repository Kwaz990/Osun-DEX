var DEXTokenSale = artifacts.require("./DEXTokenSale.sol");
var DEX_token = artifacts.require("./DEX_token.sol");

contract('DEXTokenSale', function(accounts) {
    var tokenSaleInstance;
    var tokenInstance;
    var admin = accounts[0]
    var buyer = accounts[1];
    var tokenPrice = 1000000000000000; //in wei
    var tokensAvailable = 2000000;
    var numberOfTokens;

    it('initializes the contract with the correct values', function() {
        return DEXTokenSale.deployed().then(function(instance) {
            tokenSaleInstance = instance;
            return tokenSaleInstance.address
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has contract address');
            return tokenSaleInstance.tokenContract();
        }).then(function(address) {
            assert.notEqual(address, 0x0, 'has token contract address');
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price, tokenPrice, 'token price is correct');
        });
    });

    it('Facilitates token buying', function() {
        return DEX_token.deployed().then(function(instance) {
            //grab token instance first
            tokenIsntance = instance;
            return DEXTokenSale.deployed();
        }).then(function(instance) {
            //then grab token sale instance
            tokenSaleInstance = instance;
            //provision 20% of total supply
            return tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {from: admin});
        }).then(function(receipt) {
            numberOfTokens = 10;
            return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice}) //expressed in wei
    }).then(function(receipt) {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Sell', 'should be the "Sell" event');
        assert.equal(receipt.logs[0].args._buyer, buyer, 'logs the account that purchased tokens');
        assert.equal(receipt.logs[0].args._amount, numberOfTokens, 'logs the number of tokens purchased');
        return tokenSaleInstance.tokensSold();
    }).then(function(amount) {
        assert.equal(amount.toNumber(), numberOfTokens, 'increments the number of tokens sold');
        return tokenInstance.balanceOf(buyer);
    }).then(function(balance) {
        assert.equal(balance.toNumber(), numberOfTokens);
        return tokenInstance.balanceOf(tokenSaleInstance.address);
    }).then(function(balance) {
        assert.equal(balance.toNumber(), tokensAvailable - numberOfTokens);
        //try to buy tokens different from the ether value
        return tokenSaleInstance.buyTokens(numberOfTokens, { from: buyer, value: 1});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >=0, 'msg.value must equal the nymber of tokens in wei');
            // test will fail if buy tokens is greater than tokens avaialble
        return tokenSaleInstance.buyTokens( numberOfTokens, { from: buyer, value: numberOfTokens * tokenPrice});
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert') >=0, 'cannot purchase more tokens than available');
        });                
    });


    it('ends token sale', function() {
        return DEX_token.deployed().then(function(instance) {
            //grab token instance first
            tokenIsntance = instance;
            return DEXTokenSale.deployed();
        }).then(function(instance) {
            //then grab token sale instance
            tokenSaleInstance = instance;
            //try to end sale from account other than admin
            return tokenSaleInstance.endSale({from: buyer });
        }).then(assert.fail).catch(function(error) {
            assert(error.message.indexOf('revert' >= 0, 'must be admin to end sale'));
            //End sale as admin
            return tokenSaleInstance.endSale({ from: admin });
        }).then(function(receipt){
            return tokenInstance.balanceOf(admin);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 19999990, 'returns all unsold tokens to admin');
            //check that token price is recent when selfDestruct is called
            return tokenSaleInstance.tokenPrice();
        }).then(function(price) {
            assert.equal(price.toNumber(), 0, 'token price was reset');
        });
    });
        


});