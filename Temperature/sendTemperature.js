import Web3 from "web3";

// 1. Bağlantı: Alchemy üzerinden Sepolia ağı
const web3 = new Web3(new Web3.providers.HttpProvider("https://eth-sepolia.g.alchemy.com/v2/21CFaNwuZKsw5PWlK0R09"));

// 2. Akıllı kontratın ABI’si
const abi = [
  {
    "inputs": [],
    "name": "getTemperature",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_temperature", "type": "uint256" }],
    "name": "setTemperature",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "temperature",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

//  Akıllı kontrat adresi
const contractAddress = "0xEA25EA22E1fC3125511b977AAb1ff6Ba36426058";
const contract = new web3.eth.Contract(abi, contractAddress);

//Cüzdan adresi ve private key
const account = "****************************************";
const privateKey = "*****************************************"; 

//  Sıcaklık simülasyonu (20–30 derece arası artar azalır)
let temperature = 20;
let increasing = true;

// Her 15 saniyede sıcaklık üret ve gönder
setInterval(async () => {
  temperature = increasing ? temperature + 1 : temperature - 1;
  if (temperature >= 30) increasing = false;
  if (temperature <= 20) increasing = true;

  console.log(`Güncel Sicaklik Değeri: ${temperature}°C`);

try {
  const txData = contract.methods.setTemperature(temperature).encodeABI();

    const tx = {
    to: contractAddress,
    data: txData,
    gas: 200000,
    from: account,
    maxPriorityFeePerGas: web3.utils.toWei('2', 'gwei'),
    maxFeePerGas: web3.utils.toWei('50', 'gwei')
};


  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(`İşlem gönderildi! İşlem Hash'i: ${receipt.transactionHash}`);
} 
catch (error) {
  console.error("İşlem gönderilirken hata oluştu:", error.message);
}



}, 15000); // 15 saniyede bir gönder

