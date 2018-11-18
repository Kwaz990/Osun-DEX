pragma solidity ^0.4.23;

import "./DEX_token.sol";
import "./SafeMath.sol";

contract DEXTokenSale{
    address admin;
    DEX_token public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address _buyer, uint256 _amount);

    using SafeMath for uint256;

    constructor(DEX_token _tokenContract, uint256 _tokenPrice) public {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
        //assign an admin account
        //admin will be able to end sale 
        //build token contract
        //set token price

    }

    //buy tokens

    

    function buyTokens(uint256 _numberOfTokens) public payable {
        //require that value is equal to tokens
        require(msg.value == _numberOfTokens.mul(tokenPrice), "msg value must equal the number of tokens in wei");
        //require that the contract has enough tokens
        require(tokenContract.balanceOf(this) >= _numberOfTokens, "Cannot purchase more tokens than available");
        //require that a transfer is successful
        require(tokenContract.transfer(msg.sender, _numberOfTokens), "error");
        //Keep track of number of tokens sold
        //chage addition to use safemath
        tokensSold.add(_numberOfTokens);

        //emit Sell event
        emit Sell(msg.sender, _numberOfTokens);

    }

    //Ending token sale
    function endSale() public {
        //require admin
        require(msg.sender == admin, "must be admin to end sale");
        // transfer remaining tokens to admin
        require(tokenContract.transfer(admin, tokenContract.balanceOf(this)), "all unsold tokens must return to admin");
        // destroy contract
        selfdestruct(admin);
    
    }
}