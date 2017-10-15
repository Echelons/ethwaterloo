pragma solidity ^0.4.11;

contract Mortal {
    address owner;

    function Mortal() {
      owner = msg.sender;
    }

    function kill() {
      if (msg.sender == owner) {
        selfdestruct(owner);
      }
    }
}

contract TrustE is Mortal {

  mapping(address => mapping(address => bool)) private councilOfElrond;

  event TrustAgreement(
    address addr,
    address ider
  );

  event ForgeTrust(
    address trstr,
    address trste
  );

  function initTrust(address _trustee) {
    address addr = address(new BindingTrustE(_trustee, owner));
    TrustAgreement(addr, msg.sender);
  }

  function forgeTrust(address _truster, address _trustee) {
    councilOfElrond[_truster][_trustee] = true;
    ForgeTrust(_truster, _trustee);
  }

  function isTrusted(address _truster, address _trustee) public constant returns (bool) {
    return councilOfElrond[_truster][_trustee];
  }

}

contract BindingTrustE is Mortal {
  address trustee;
  address truster;
  TrustE fellowship;

  function BindingTrustE(address _trustee, address _truster) {
    trustee = _trustee;
    truster = _truster;
    fellowship = TrustE(msg.sender);
  }

  function andInTheDarknessBindThem() {
    if (msg.sender == trustee) {
      fellowship.forgeTrust(trustee, truster);
    }
  }

}
