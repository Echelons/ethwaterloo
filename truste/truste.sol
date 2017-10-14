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

  function andInTheDarknessBindThem() constant returns (bool) {
    if (msg.sender == trustee) {
      return true;
    } else {
      return false;
    }
  }

}

contract TrustE is Mortal {

  function initTrust(address _trustee) returns (address) {
    if (msg.sender != _trustee) {
      BindingTrustE binding = new BindingTrustE(_trustee);
      return (binding);
    }
    return this;
  }

}
