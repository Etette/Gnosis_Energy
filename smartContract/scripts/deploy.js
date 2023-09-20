// Import ethers library
const {ethers, JsonRpcProvider, Wallet} = require("ethers");
const contra = require('../artifacts/contracts/GnosisEnergy.sol/GnosisEnergy.json');

async function main() {

  // Connect to an Ethereum node 
  const provider = new JsonRpcProvider("https://rpc.chiadochain.net");
  
  const mnemonic = "";
  let mnemonicWallet = Wallet.fromPhrase(mnemonic);
  console.log(`privatekey : ${mnemonicWallet.privateKey}`);
  

  console.log("Deploying with account:", mnemonicWallet.address);

  const signer = new ethers.Wallet(mnemonicWallet.privateKey, provider);
  const factory = await new ethers.ContractFactory(contra.abi, contra.bytecode, signer);
  

  // Deploy the contract
  initialPrice = 0.00001 * 10**18;
  console.log(initialPrice)
  const myContract = await factory.deploy(initialPrice); // energyPrice is set to 0.00001xDai

  await myContract.waitForDeployment()

  console.log("MyContract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
