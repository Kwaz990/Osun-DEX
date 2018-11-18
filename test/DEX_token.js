var DEX_token = artifacts.require("./DEX_token.sol");

contract('DEX_token', function(accounts) {
    var tokenInstance;

    it('initialized the contract with the correct values', function() {
        return DEX_token.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(name) {
            assert.equal(name, 'Osun Token', 'has the correct name');
            return tokenInstance.symbol();
        }).then(function(symbol) {
            assert.equal(symbol, 'OSUN', 'has the correct symbol');
            return tokenInstance.standard();
        }).then(function(standard) {
            assert.equal(standard, 'Osun Token v1.0', 'has correct standard');
        });    
    })

    it('sets the token supply upon deployment', function() {
        return DEX_token.deployed().then(function(instance){
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply.toNumber(), 10000000, 'sets the ttoal supply to 10,000,000');
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 10000000, "it allocates the initial supply to the administartor")
        });
    });



    it('transfers token ownership', function() {
        return DEX_token.deployed().then(function(instance){
        tokenInstance = instance;
        //Test 'require' statement first by transferring something larger than the sender's balance
        return tokenInstance.transfer.call(accounts[1], 9999999999999999999999999999999);
    }).then(assert.fail).catch(function(error) {
        assert(require,'Insufficient funds, revert');
        return tokenInstance.transfer.call(accounts[1], 2500, { from: accounts[0] });
    }).then(function(success){
        assert.equal(success, true, "it returns true");
        return tokenInstance.transfer(accounts[1], 2500, { from: accounts[0] });
    }).then(function(receipt) {
        assert.equal(receipt.logs.length, 1, 'triggers one event');
        assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
        assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
        assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
        assert.equal(receipt.logs[0].args._value, 2500, 'logs the transfer amount');
        return tokenInstance.balanceOf(accounts[1]);
    }).then(function(balance) {
        assert.equal(balance.toNumber(), 2500, 'Correct number of tokens transfered to revieving account');
        return tokenInstance.balanceOf(accounts[0]);
    }).then(function(balance) {
        assert.equal(balance.toNumber(), 9997500, 'deducts correct number of tokens from sending account');
    });  
});
    
    it('approves tokens for delegated transfer', function() {
        return DEX_token.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.approve.call(accounts[1], 100);
        }).then(function(success){
            assert.equal(success, true, 'it returns true');
            return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
        }).then(function(receipt) {
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Approval', 'should be the "Approval" event');
            assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');
            return tokenInstance.allowance(accounts[0], accounts[1]);
        }).then(function(allowance){
            assert.equal(allowance.toNumber(), 100, 'stores the allowance for delegated transfer');
        });
    });

    it('handles delegated toekn transfers', function(){
        return DEX_token.deployed().then(function(instance) {
            tokenInstance = instance;
            fromAccount = accounts[2];
            toAccount = accounts[3];
            spendingAccount = accounts[4];
            //Transfer some tokens to fromAccount
            return tokenInstance.transfer(fromAccount, 100, { from: accounts[0] });
        }).then(function(receipt) {
            // Approve spendingAccount to spend 10 tokens from fromAccount
            return tokenInstance.approve(spendingAccount, 10, { from: fromAccount });
        }).then(function(receipt) { 
            //Try transffering something larger than sender's balance
            return tokenInstance.transferFrom(fromAccount, toAccount, 9999, { from: spendingAccount });
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >=0, 'Cannot transfer value larger than balance');
            //try transfering value greater than the approved ammount
            return tokenInstance.transferFrom(fromAccount, toAccount, 20, { from: spendingAccount });
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert') >=0, 'Cannot transfer value larger than approved ammount');
            return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, { from: spendingAccount });
        }).then(function(success){
            assert.equal(success, true);
            return tokenInstance.transferFrom(fromAccount, toAccount, 10, { from: spendingAccount });
        }).then(function(receipt) { 
            assert.equal(receipt.logs.length, 1, 'triggers one event');
            assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Approval" event');
            assert.equal(receipt.logs[0].args._from, fromAccount, 'logs the account the tokens are transferred from');
            assert.equal(receipt.logs[0].args._to, toAccount, 'logs the account the tokens are transferred to');
            assert.equal(receipt.logs[0].args._value, 10, 'logs the transfer amount');
            return tokenInstance.balanceOf(fromAccount);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 90, 'deducts ammount from sending account');
            return tokenInstance.balanceOf(toAccount);
        }).then(function(balance) {
            assert.equal(balance.toNumber(), 10, 'adds ammount to receiving account');
            return tokenInstance.allowance(fromAccount, spendingAccount);
        }).then(function(allowance){
            assert.equal(allowance.toNumber(), 0, 'deducts the amount from the allowance');
        });
    });
});