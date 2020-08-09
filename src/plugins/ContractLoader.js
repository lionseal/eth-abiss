import Vue from "vue";
import Web3 from "web3";

function getWeb3() {
  if (window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
    return new Web3(window.ethereum);
  } else if (window.web3) {
    // Legacy dapp browsers...
    return new Web3(window.web3.currentProvider);
  }
  return null;
}

async function unlockBuiltIn() {
  const web3 = getWeb3();
  let accounts = await web3.eth.getAccounts().catch(() => []);
  if (accounts.length === 0) {
    if (window.ethereum) {
      accounts = await window.ethereum.enable();
      if (accounts.length === 0) throw new Error("Wallet locked.");
    }
  }
  return accounts[0];
}

function getEstimate(method, from) {
  const web3 = getWeb3();
  return web3.eth
    .estimateGas({
      data: method.encodeABI(),
      from,
      gasLimit: 9000000
    })
    .then(res => res * 1.5)
    .catch(() => undefined);
}

let web3;
const contracts = {};

function find(chainId, networkName, contractName) {
  if (!contracts[chainId]) contracts[chainId] = {};
  if (!contracts[chainId][networkName]) contracts[chainId][networkName] = {};
  if (contracts[chainId][networkName][contractName]) {
    return contracts[chainId][networkName][contractName];
  }
}

function loadWeb3() {
  if (!web3) web3 = getWeb3();
  return web3;
}

function loadContract(deployments, chainId, networkName, contractName) {
  let contract = find(chainId, networkName, contractName);
  if (contract) return contract;
  const web3 = loadWeb3();
  const { abi, address } = deployments[chainId][networkName].contracts[
    contractName
  ];
  contract = new web3.eth.Contract(abi, address);
  contracts[chainId][networkName][contractName] = contract;
  return contract;
}

function methodCall(
  deployments,
  chainId,
  networkName,
  contractName,
  method,
  inputs = []
) {
  const contract = loadContract(
    deployments,
    chainId,
    networkName,
    contractName
  );
  return contract.methods[method.name](...inputs).call();
}

async function methodSend(
  deployments,
  chainId,
  networkName,
  contractName,
  method,
  inputs = [],
  cb
) {
  const contract = loadContract(
    deployments,
    chainId,
    networkName,
    contractName
  );
  const from = await unlockBuiltIn();
  const execute = contract.methods[method.name](...inputs);
  const gasLimit = await getEstimate(execute, from);
  return new Promise((resolve, reject) => {
    try {
      execute
        .send({ from, gasLimit })
        .on("transactionHash", resolve)
        .on("confirmation", (confirmationNumber, receipt) => {
          if (confirmationNumber === 0) {
            if (receipt.status) {
              if (cb) cb(null, receipt);
            } else {
              if (cb) cb(new Error("Transaction failed", receipt));
            }
          }
        })
        .on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
}

Vue.prototype.$loadContract = loadContract;
Vue.prototype.$methodCall = methodCall;
Vue.prototype.$methodSend = methodSend;
