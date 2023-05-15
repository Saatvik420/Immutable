import React, { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import { contractABI } from "../utils/Constants";

// Create a context for the smart contract
export const ImmutableContext = createContext();

// Define the contract address
const contractAddress = "0x804e7bd5CdeBefaa1482c1FCd625189782cAD30C";

// Define the contract context provider
export const ImmutableProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  // Initialize web3 and the smart contract
  useEffect(() => {
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        // Modern dapp browsers
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          // Load the smart contract
          const contract = new web3.eth.Contract(contractABI, contractAddress);
          setContract(contract);

          // Get the user's account
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        // Legacy dapp browsers
        setWeb3(window.web3.currentProvider);
      } else {
        // Non-dapp browsers
        alert(
          "Please install MetaMask or another Ethereum-compatible browser extension."
        );
      }
    };

    initializeWeb3();
  }, []);

  // File a complaint
  const fileComplaint = async (
    name,
    contact,
    location,
    description,
    evidenceId,
    callback
  ) => {
    try {
      const receipt = await contract.methods
        .fileComplaint(name, contact, location, description, evidenceId)
        .send({ from: account });

      // Optional callback
      if (callback) {
        callback(receipt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch complaint details by transaction hash
  const fetchComplaint = async (txHash) => {
    try {
      const complaint = await contract.methods.fetchComplaint(txHash).call();

      // Return the complaint details
      return complaint;
    } catch (error) {
      console.error(error);
    }
  };

  const getTxHash = async (complaintId) => {
    try {
      const txHash = await contract.methods.getTxHash(complaintId).call();
      return txHash;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ImmutableContext.Provider
      value={{
        web3,
        account,
        fileComplaint,
        fetchComplaint,
        getTxHash,
      }}
    >
      {children}
    </ImmutableContext.Provider>
  );
};
