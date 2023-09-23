const {ethers, Wallet} = require('ethers');
const contract_abi = require('../GnosisEnergy.json');
const account = require('../routes/routes');
const XDai = require('../utils/utils');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});


// const initializeProvider = async() => {
//     // Check if MetaMask is installed and available
//     if (typeof window.ethereum !== 'undefined') {
//       // Use MetaMask as a provider
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       return provider;
//     } else {
//       throw new Error('MetaMask is not installed or not available.');
//     }
// }

// Connect to an Ethereum node
const _provider = 'https://rpc.chiadochain.net';
console.log('_p',_provider);

const provider = new ethers.JsonRpcProvider(_provider);
console.log(provider);

// The address of smart contract
const contractAddress = '0x822D15135492985B195CE96EC0190d51264daC92';

// get contract abi
abi = contract_abi.abi;
const contract = new ethers.Contract(contractAddress, abi, provider);

// const mnemonic = process.env.MNEMONIC;
// const mnemonicWallet = Wallet.fromPhrase(mnemonic);
// console.log('wallet address', mnemonicWallet.address);

const Fixtures = async () => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const _signer = accounts[0];
        console.log('signer',_signer);
        return _signer;
    } catch (e) {
        return {error: e.message};
    }
}

const _signer = account;
//const signedContract = new ethers.Contract(contractAddress, abi, signer);

// const _Signer = null;
// const _signer = new ethers.Wallet(_Signer.privateKey, provider);
const signedContract = new ethers.Contract(contractAddress, abi, _signer);


exports.getUserTransactions = async (address) => {
  try {
    const result = await contract.getUserTotalPayment(address);
    if (result > 0){
        //console.log(XDai.formatXDai(result.toString()));
        return XDai.formatXDai(result.toString());
    }
    //console.log(result);
    return result.toString();
  } catch (error) {
    console.error("Error interacting with contract:", error.message);
    return {success: false, Err: error};
  }
}

// console.log(getUserTransactions(mnemonicWallet));

exports.getPrice = async () => {
    try{
        const price = await contract.energyPrice();
        if (price > 0) {
            stringPrice = price.toString();
            formattedPrice = XDai.formatXDai(stringPrice);
            console.log('formattedPrice',formattedPrice)
            return formattedPrice;
        }
        return price.toString();
    } catch (e) {
        console.error("Error interacting with contract:", e.message);
        return {success: false, Err: e};
    }
}

exports.getOwner = async () => {
    try{
        const owner = await contract.owner();
        return owner.toString();
    } catch (e) {
        console.error("Error interacting with contract:", e.message);
        return {success: false, Err: e};
    }
}

exports.updatePrice = async (newPrice) => {
    newPrice = XDai.parseXDai(newPrice);
    try {
        const updatePrice = await signedContract.updateEnergyPrice(newPrice);
        return updatePrice.toString();
    } catch (e) {
        console.log('error', e.message);
        return e.message;
    }
}

exports.buyEnergy = async (amount) => {
    amount = XDai.parseXDai(amount);
    try {
        
        const pay = await signedContract.makePayment({
            value: amount,
        });
        // Wait for the transaction to be mined
        const receipt = await pay.wait();
        return receipt;
    } catch (e) {
        console.log('error', e.message);
        return e.message;
    }
}

exports.withdraw = async (address) => {
    try{
        const _withdraw = await signedContract.withdrawFunds(address);
        const reciept = await _withdraw.wait();
        return reciept;
    } catch (e) {
        return { success: false, error: e.message};
    }
}




