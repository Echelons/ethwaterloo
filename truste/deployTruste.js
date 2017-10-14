fs = require('fs')
Web3 = require('web3')
solc = require('solc')

web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

deployHandler = (err, contract) => {
  if(!err) {
    // NOTE: The callback will fire twice!
    // Once the contract has the transactionHash property set and once its deployed on an address.
    // e.g. check tx hash on the first call (transaction send)
    if(!contract.address) {
      console.log("Transaction Hash")
      console.log(contract.transactionHash) // The hash of the transaction, which deploys the contract
    // check address on the second call (contract deployed)
    } else {
      console.log("Contract Address")
      console.log(contract.address) // the contract address
    }
    // Note that the returned "myContractReturned" === "myContract",
    // so the returned "myContractReturned" object will also get the address set.
  }
}

// Compile
trusteCode = fs.readFileSync('truste.sol').toString()
trusteCompiledCode = solc.compile(code)

trusteABI = JSON.parse(compiledCode.contracts[':TrustE'].interface)
trusteContract = web3.eth.contract(abiDefinition)
trusteByteCode = compiledCode.contracts[':TrustE'].bytecode
trusteDeployedContract = trusteContract.new([],{data: trusteByteCode, from: web3.eth.accounts[0], gas: 1000000}, deployHandler)
trusteInstance = TrustEContract.at(trusteDeployedContract.address)

bindingContractAddress = trusteInstance.initTrust(web3.eth.accounts[1])

