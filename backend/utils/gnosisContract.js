const {ethers, Wallet} = require('ethers');
const contract_abi = require('../GnosisEnergy.json');
const XDai = require('../utils/utils');
const dotenv = require('dotenv');
dotenv.config({path: '../.env'});


// Connect to an Ethereum node
const _provider = process.env.PROVIDER
const provider = new ethers.JsonRpcProvider(_provider);

// The address of smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;

// get contract abi
abi = contract_abi.abi;
const contract = new ethers.Contract(contractAddress, abi, provider);

const mnemonic = process.env.MNEMONIC;
const mnemonicWallet = Wallet.fromPhrase(mnemonic);

const signer = new ethers.Wallet(mnemonicWallet.privateKey, provider);
const signedContract = new ethers.Contract(contractAddress, abi, signer);



exports.getUserTransactions = async (address) => {
  try {
    const result = await contract.getUserTotalPayment(address);
    if (result > 0){
        return XDai.formatXDai(result.toString());
    }
    return result.toString();
  } catch (error) {
    console.error("Error interacting with contract:", error.message);
    return {success: false, Err: error};
  }
}

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




