pragma solidity ^0.4.23;

 

contract DEX_token {
 // constructor 
 //set the total number of tokens
 //Read the total number of tokens
    string public name = "Osun Token";
    string public symbol = "OSUN";
    string public standard = "Osun Token v1.0";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner, 
        address indexed _spender, 
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowance;

     // it is convenvtion in solidity to use a n _ infront of vairables local to functions. global variables like totalSupply do not start with _. 
    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
        // allocate the intial supply
    }   

    //Transfer function - allows token to be transfered between users
    //exception if account doesnt have enough
    //transfer event
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Insufficient funds, revert");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        //emit Transfer event 
        emit Transfer(msg.sender, _to, _value);

        return true;

    }

    //Transferfrom
    //fire transfer event
    //require authorization from _from address
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "insufficient balance");
        require(_value <= allowance[_from][msg.sender], "insufficient allowance");
        //change the balance
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);
        return true;

    }
      /*  if (balanceOf[msg.sender] >= _value && allowed[_from][msg.sender]){
            balanceOf[msg.sender] -= _value;
            balanceOf[_to] += _value;
        //emit transfter event
            emit Transfer(msg.sender, _to, _value);
            return true;
        } else {return "Cannot complete withdraw due to insufficient funds";}
    } */
        
    
    function approve(address _spender, uint256 _value) public returns (bool succes) {
        //allowance
        allowance[msg.sender][_spender] = _value;
        //Approval event
        emit Approval(msg.sender, _spender, _value);
        return true;

    }

   // function allowance(address _owner, address _spender) public view returns (uint256 remaining) {

   // }
    
}