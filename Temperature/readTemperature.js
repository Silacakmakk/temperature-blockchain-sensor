import Web3 from "web3";

const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/21CFaNwuZKsw5PWlK0R09"));

const abi = [
  {
    "inputs": [],
    "name": "getTemperature",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const contractAddress = "0xEA25EA22E1fC3125511b977AAb1ff6Ba36426058";
const contract = new web3.eth.Contract(abi, contractAddress);

const readTemperature = async () => {
    const currentTemp = await contract.methods.getTemperature().call();
    console.log(`Blockchain'deki kayitli sicaklik: ${currentTemp}°C`);
};

readTemperature();