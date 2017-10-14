pragma solidity ^0.4.11;

contract Mortal {
    address owner;

    function mortal() {
      owner = msg.sender;
    }

    function kill() {
      if (msg.sender == owner) {
        selfdestruct(owner);
      }
    }
}

contract BindingTrustE is Mortal {
  address trustee;

  function BindingTrustE(address _trustee) {
    trustee = _trustee;
  }

}

contract TrustE is Mortal {

  function initTrust(address _trustee) constant returns (address boundAddress) {
    if(msg.sender != _trustee) {
      BindingTrustE bound = new BindingTrustE(_trustee);
      return address(bound);
    }
    return msg.sender;
  }

}