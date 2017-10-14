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

  event TrustAgreement(
    address addr,
    address ider
  );

  function initTrust(address _trustee) {
    address addr = address(new BindingTrustE(_trustee));
    TrustAgreement(addr, msg.sender);
  }

}
