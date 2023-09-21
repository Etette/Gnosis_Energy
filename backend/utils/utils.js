// format xDai input and output

exports.formatXDai = (amount) => {
    let value = amount / 10**18;
    return value;
}

exports.parseXDai = (amount) => {
    let value = amount * 10**18;
    return value;
}

// console.log(formatXDai(10000000000000000));
// console.log(parseXDai(0.01));

// async function connectMetaMask() {
//   // Check if MetaMask is installed and available
//   if (typeof window.ethereum !== "undefined") {
//     try {
//       // Request access to the user's MetaMask account
//       await window.ethereum.send("eth_requestAccounts");

//       // Create an ethers provider connected to MetaMask
//       const provider = new ethers.providers.Web3Provider(window.ethereum);

//       // Get the connected account
//       const signer = provider.getSigner();
//       const account = await signer.getAddress();

//       console.log("Connected MetaMask Account:", account);

//       // You can now use 'signer' to sign transactions
//     } catch (error) {
//       console.error("Error connecting to MetaMask:", error.message);
//     }
//   } else {
//     console.error("MetaMask is not installed or not available.");
//   }
// }
