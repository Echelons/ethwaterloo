fs = require('fs')
Web3 = require('web3')
solc = require('solc')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

createTruste = (contract, bytecode) => {
  return new Promise((resolve, reject) => {
    contract.new([], {data: bytecode, from: web3.eth.accounts[0], gas: 1000000}, (err, res) => {
      if(!err) {
        if(res.address) {
          console.log(res.address)
          resolve(res.address)
        }
      } else {
        console.log(err)
        reject("failed deploy")
      }
    })
  })
}

code = fs.readFileSync('../truste/truste.sol').toString()
compiledCode = solc.compile(code)

trusteABI = JSON.parse(compiledCode.contracts[':TrustE'].interface)
trusteContract = web3.eth.contract(trusteABI)
trusteByteCode = compiledCode.contracts[':TrustE'].bytecode
createTruste(trusteContract, trusteByteCode)