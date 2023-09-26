const {ethers, Wallet} = require('ethers');
const contract_abi = require('../GnosisEnergy.json');
const XDai = require('../utils/utils');
const randNum = require('../utils/utils');
const dotenv = require('dotenv');
dotenv.config({path: './.env'});


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

console.log(Fixtures())
const provider = 'https://rpc.chiadochain.net';
//console.log(provider)
const signer = Fixtures();


// get contract abi
abi = contract_abi.abi;

// The address of smart contract
const contractAddress = '0x822D15135492985B195CE96EC0190d51264daC92';
const contract = new ethers.Contract(contractAddress, abi, provider);

// const mnemonic = process.env.MNEMONIC;
// const mnemonicWallet = Wallet.fromPhrase(mnemonic);
// console.log('wallet address', mnemonicWallet.address);


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
        const updatePrice = await contract.connect(signer).updateEnergyPrice(newPrice);
        await updatePrice.wait();
        return {success: true, msg: updatePrice};
    } catch (e) {
        console.log('error', e.message);
        return e.message;
    }
}

exports.buyEnergy = async (amount) => {
    amount = XDai.parseXDai(amount);
    try {
        
        const pay = await contract.connect(signer).makePayment({
            value: amount,
        });
        // Wait for the transaction to be mined
        const receipt = await pay.wait();
        return {receipt: receipt, token: randNum()};
    } catch (e) {
        console.log('error', e.message);
        return e.message;
    }
}

exports.withdraw = async (address) => {
    try{
        const _withdraw = await contract.connect(signer).withdrawFunds(address);
        const reciept = await _withdraw.wait();
        return reciept;
    } catch (e) {
        return { success: false, error: e.message};
    }
}




