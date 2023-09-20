// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract GnosisEnergy {
    uint256 public energyPrice;  // price in xDai per 1kw of energy
    address public owner; // address of contract deployer alias distro company
    
    // Mapping to store the payment history for each address
    mapping(address => uint256) internal payments; // total amount of payments made by a user

    event EnergyPurchased(address indexed user, uint256 amount);
    event PriceUpdated(uint256 currAmount);
    event withdrawal(uint256 amount, address indexed owner);

    constructor(uint256 _initialEnergyPrice) { 
        owner = msg.sender;
        // _initialEnergyPrice =_initialEnergyPrice * (10**18);
        energyPrice = _initialEnergyPrice;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized");
        _;
    }

    // function to allow smart contract recieve funds
    receive() external payable {}

    // function to update the unit price  of energy
    function updateEnergyPrice(uint256 _newPrice) external onlyOwner() {
        // _newPrice = _newPrice * (10**18);
        energyPrice = _newPrice;
        emit PriceUpdated(energyPrice);
    }

    function makePayment() external payable {
        if (msg.value < energyPrice) {
            revert("low funds");
        }
        recordPayment(msg.sender, msg.value);
        emit EnergyPurchased(msg.sender, msg.value);
        // in the backend function, input user value and divide by 10**18 so when called to smart
        // contract it is multiplied by 10*18
    }

    // Function to record a payment
    function recordPayment(address payer, uint256 amount) internal {
        if (amount < 0 || msg.sender.balance < amount){
            revert("record failed");
        }
        payments[payer] += amount;
    }

    // Function to get the total payment for a specific address
    function getUserTotalPayment(address User) external  view returns (uint256 allTimePurchase) {
        return payments[User];
    }

     // Function to transfer the contract's balance to a specified address
    function withdrawFunds(address payable recipient) public onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "zero balance");
        recipient.transfer(contractBalance);
        emit withdrawal(contractBalance, recipient);
    }

}
