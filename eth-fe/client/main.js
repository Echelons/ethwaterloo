import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var trusteABI = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_truster","type":"address"},{"name":"_trustee","type":"address"}],"name":"isTrusted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_trustee","type":"address"}],"name":"initTrust","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_truster","type":"address"},{"name":"_trustee","type":"address"}],"name":"forgeTrust","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"ider","type":"address"}],"name":"TrustAgreement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"trstr","type":"address"},{"indexed":false,"name":"trste","type":"address"}],"name":"ForgeTrust","type":"event"}]
const trusteByteCode = "60606040525b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b5b610972806100566000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b51461005f5780636713e23014610074578063cd977905146100e4578063ef07805a1461011d575b600080fd5b341561006a57600080fd5b610072610175565b005b341561007f57600080fd5b6100ca600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610207565b604051808215151515815260200191505060405180910390f35b34156100ef57600080fd5b61011b600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061029c565b005b341561012857600080fd5b610173600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506103e6565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610204576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1690505b92915050565b6000816000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166102c9610516565b808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051809103906000f080151561034857600080fd5b90507f5d9eb68a53fe7766f0985af38b5f0ade805836b18d4dcd7460098379adfb1ba78133604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b60018060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055507fbded55222fea5de38535aac0939e1402e6da15278462342ae3df5b88d29d00878282604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b5050565b604051610420806105278339019056006060604052341561000f57600080fd5b604051604080610420833981016040528080519060200190919080519060200190919050505b5b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b50505b6102d38061014d6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b514610049578063be108e531461005e575b600080fd5b341561005457600080fd5b61005c610073565b005b341561006957600080fd5b610071610105565b005b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610102576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102a457600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ef07805a600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b151561028f57600080fd5b6102c65a03f115156102a057600080fd5b5050505b5b5600a165627a7a723058209410e5a0e6ad19bd34ea5f5e3ca6ef88f7e3bc84eccb5b18ef82e8efdaaf05c10029a165627a7a723058201ca3035b80e9ff35bfbbfd41d9d696e847e45bf3f985401276edadd4af2b37350029";
var bindingABI = [{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"andInTheDarknessBindThem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_trustee","type":"address"},{"name":"_truster","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

trusteContract = web3.eth.contract(trusteABI)

createTruste = (contract, bytecode) => {
  return new Promise((resolve, reject) => {
    contract.new([], {data: bytecode, from: web3.eth.accounts[0], gas: 1000000}, (err, res) => {
      if(!err) {
        if(res.address) {
          trusteInstance = trusteContract.at(res.address)
          resolve(trusteInstance)
        }
      } else {
        reject("failed deploy")
      }
    })
  })
}

initTrust = (instance, trustee_addr) => {
  return new Promise((resolve, reject) => {
    let event = instance.TrustAgreement({ider: web3.eth.accounts[0]})
    event.watch((err, res) => {
      event.stopWatching()
      resolve(res.args["addr"])
    })
    instance.initTrust(trustee_addr, {from: web3.eth.accounts[0], gas: 1000000}, (err, res) => {
      if(err) {
        console.log(err)
        reject("failed init")
      }
    })
  })
}

bindTrust = (address, trusteInstance) => {
  bindingContract = web3.eth.contract(bindingABI)
  bindingInstance = bindingContract.at(address)
  console.log(bindingInstance)
  return new Promise((resolve, reject) => {
    let event = trusteInstance.ForgeTrust({trste: web3.eth.accounts[0]})
    event.watch((err, res) => {
      if(!err) {
        event.stopWatching()
        resolve(res.args)
      } else {
        event.stopWatching()
        reject(err)
      }
    })
    bindingInstance.andInTheDarknessBindThem((err, res) => {
      console.log("happy days")
    })
    setTimeout(() => {
      event.stopWatching()
      reject("no event")}, 30000)
  })
}

createTrusteAgreement = (address, trusteInstance) => {
  return new Promise((resolve, reject) => {
    initTrust(trusteInstance, address)
    .then((bindingAddr) => {
      resolve(bindingAddr)
    })
    .catch((err) => {
      console.log(err)
      reject(err)
      alert("Contract failed to execute!")
    })
  })
}

checkTrust = (address, truste) => {
  return truste.isTrusted(web3.eth.accounts[0], address)
}

var trusteInstance = trusteContract.at("0xd75b1f585990b2a41b8043482b55f5f5593cd25d")

// createTruste(trusteContract, trusteByteCode)
// .then((res) => {
//   alert("trusteInstance created!")
//   trusteInstance = res
//   console.log(res)
// })

Template.body.events({
  'click #btnTrust'(event) {
    event.preventDefault();
    let trustee_address = document.getElementById("TrustAcct").value
    if(!trustee_address) {
      alert("Please enter an address!")
    } else if (web3.eth.accounts.length = 0) {
      alert("Please enable metamask")
    } else {
      createTrusteAgreement(trustee_address, trusteInstance)
      .then((res) => {
        bindingAddr = res
        console.log(bindingAddr)
      })
    }
  },
  'click #btnAccept'(event) {
    event.preventDefault();
    let bindAddr = document.getElementById("TrustAcct").value
    if(!bindAddr) {
      alert("Please enter an address!")
    } else if (web3.eth.accounts.length = 0) {
      alert("Please enable metamask")
    } else {
      bindTrust(bindAddr, trusteInstance)
      .then((res) => {
        console.log(res)
      }, (err) => {
        console.log(err)
      })
      .catch((err) => {
        alert("Contract failed to execute!")
      })
    }
  },
  'click #btnLookup'(event) {
    event.preventDefault()
    let trst_lkup = document.getElementById("TrustLookup").value
    if(!trst_lkup) {
      alert("Please enter an address!")
    } else if (web3.eth.accounts.length = 0) {
      alert("Please enable metamask")
    } else {
      console.log(checkTrust(trst_lkup, trusteInstance))
    }
  }
})