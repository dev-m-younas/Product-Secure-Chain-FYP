import { ethers } from 'ethers';
import ContractABI from './ContractABI.json';

// Replace with your actual contract address and ABI
const contractAddress = '0xeEaFe7D9A873273d26C4976001737ec52964161b';
const contractAbi: any[] =ContractABI.abi; // Replace with your actual ABI

// Replace with your actual Ethereum node URL
const provider = new ethers.providers.JsonRpcProvider('https://goerli.infura.io/v3/e8a775164ad4424caa6e10c162b7cb01');

// Replace with your actual private key
const privateKey = '9bb61b54e245e47423f21df55a073626baaf83055e33f57af4dfc054eedf2cff';

// Create a wallet using the private key
const wallet = new ethers.Wallet(privateKey, provider);

// Connect to the contract
const supplyChainContract = new ethers.Contract(contractAddress, contractAbi, wallet);

// Replace with your manufacturer details
const manufacturerName = 'Your Manufacturer Name';
const manufacturerEmail = 'Your Manufacturer Email';

// Replace with your product details
const productName = 'Your Product Name';
const productBarcodeId = 'Your Product Barcode ID';
const productCurrentTime = Math.floor(Date.now() / 1000); // Current time in epoch

// Replace with the buyer's Ethereum address
const buyerAddress = 'BUYER_ETHEREUM_ADDRESS';

// Replace with the user details you want to add
const userToAdd = {
  role: 1, // Manufacturer role
  id_: 'USER_ETHEREUM_ADDRESS',
  name: 'User Name',
  email: 'user@email.com'
};

// Interaction with the smart contract
async function interactWithSmartContract(): Promise<void> {
  // Get all products
  const allProducts = await supplyChainContract.getAllProducts();
  console.log('All Products:', allProducts);

  // Add a new product
  await supplyChainContract.addProduct(
    {
      name: productName,
      barcodeId: productBarcodeId,
      timestamp: productCurrentTime
    },
    productCurrentTime
  );

  // Get the added product
  const addedProduct = await supplyChainContract.getSingleProduct(productBarcodeId);
  console.log('Added Product:', addedProduct);

  // Sell the product to a buyer
  await supplyChainContract.sellProduct(buyerAddress, productBarcodeId, productCurrentTime);

  // Add a new party (user)
  await supplyChainContract.addParty(userToAdd);

  // Get user details
  const userDetails = await supplyChainContract.getUserDetails(buyerAddress);
  console.log('User Details:', userDetails);

  // Get the list of users added by the current logged-in user
  const userPartyList = await supplyChainContract.getMyUsersList();
  console.log('User Party List:', userPartyList);
}

// Call the function
interactWithSmartContract();
