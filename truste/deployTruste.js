fs = require('fs')
Web3 = require('web3')
solc = require('solc')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

web3.eth.defaultAccount = web3.eth.accounts[1]

createTruste = (contract, bytecode) => {
  return new Promise((resolve, reject) => {
    contract.new([], {data: bytecode, from: web3.eth.accounts[0], gas: 1000000}, (err, res) => {
      if(!err) {
        if(res.address) {
          trusteInstance = trusteContract.at(res.address)
          resolve(trusteInstance)
        }
      } else {
        console.log(err)
        reject("failed deploy")
      }
    })
  })
}

initTrust = (instance) => {
  return new Promise((resolve, reject) => {
    let event = instance.TrustAgreement({ider: web3.eth.accounts[0]})
    event.watch((err, res) => {
      event.stopWatching()
      resolve(res.args["addr"])
    })
    instance.initTrust(web3.eth.accounts[1], {from: web3.eth.accounts[0], gas: 1000000}, (err, res) => {
      if(err) {
        console.log(err)
        reject("failed init")
      }
    })
  })
}

bindTrust = (instance) => {
  return new Promise((resolve, reject) => {
    let event = instance.ForgeTrust({trste: web3.eth.accounts[1]})
    event.watch((err, res) => {
      event.stopWatching()
      resolve(res.args)
    })
  })
}

// Compile
code = fs.readFileSync('truste.sol').toString()
compiledCode = solc.compile(code)

trusteABI = JSON.parse(compiledCode.contracts[':TrustE'].interface)
console.log("ABI")
console.log(trusteABI)
trusteContract = web3.eth.contract(trusteABI)
trusteByteCode = compiledCode.contracts[':TrustE'].bytecode
console.log("ByteCode")
console.log(trusteByteCode)
createTruste(trusteContract, trusteByteCode)
.then((trusteInstance) => {
  return initTrust(trusteInstance)
})
.then((bindingAddr) => {
  bindingABI = JSON.parse(compiledCode.contracts[':BindingTrustE'].interface)
  bindingContract = web3.eth.contract(bindingABI)
  console.log("ABI")
  console.log(bindingABI)
  bindingInstance = bindingContract.at(bindingAddr)
  console.log(bindingInstance.andInTheDarknessBindThem())
})
