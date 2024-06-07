import React, { useEffect, useState } from "react";
import ArtworkNFT_ABI from "./contract/royalti_abi.json"; 
const ethers = require("ethers")

const Connection = () =>{

let contractAddress = "0xd85eFcaE18F95A707fCDFF0503f018e2B4495012";

const [errorMessage, setErrorMessage] = useState(null);
const [defaultAccount, setDefaultAccount] = useState(null);
const [connButtonText, setConnButtonText] = useState("Connect Wallet");

const [provider, setProvider] = useState(null);
const [signer, setSigner] = useState(null);
const [contract, setContract] = useState(null);

const connectWalletHandler = () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        accountChangedHandler(result[0]);
        setConnButtonText("Wallet Connected");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  } else {
    console.log("Need to install MetaMask");
    setErrorMessage("Please install MetaMask browser extension to interact");
  }
};

const accountChangedHandler = (newAccount) => {
  setDefaultAccount(newAccount);
  updateEthers();
};

const chainChangedHandler = () => {
  window.location.reload();
};


useEffect(() => {
  

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accountChangedHandler);
    window.ethereum.on("chainChanged", chainChangedHandler);
  }

  return () => {
    // Cleanup: Unsubscribe event listeners when component unmounts
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", accountChangedHandler);
      window.ethereum.removeListener("chainChanged", chainChangedHandler);
    }
  };
},[]); 

const updateEthers = () => {
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(tempProvider);

  let tempSigner = tempProvider.getSigner();
  setSigner(tempSigner);

  let tempContract = new ethers.Contract(
    contractAddress,
    ArtworkNFT_ABI,
    tempSigner
  );
  setContract(tempContract);
  console.log("temp contract:"+tempContract);
}; 

  return (
    <div className='border rounded mx-5 my-3'>
      <center><i><h2 className="my-3">Connection</h2></i>
    <button className={`btn btn-${!defaultAccount?'primary':'success'} my-4`} onClick={connectWalletHandler}>{!defaultAccount?'Click Here to Connect':'Connected to Metamask'}</button>
      <h5 style={{color:"green"}}>{defaultAccount}</h5>
      </center>
    </div>
  );
}
export default Connection;