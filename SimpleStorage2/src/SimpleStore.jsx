import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import SimpleStorage_abi from "./contracts/SimpleStorage_abi.json";

const SimpleStorage = () => {
  let contractAddress = "0x98044d118a7D97641655b9cCf39B6aF26051d7F1";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [dataList, setDataList] = useState([]);

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
      SimpleStorage_abi,
      tempSigner
    );
    setContract(tempContract);
  };

  const setHandler = (event) => {
    event.preventDefault();
    console.log("sending " + event.target.setNum.value + " to the contract");
    let name=event.target.pname.value;
    let description=event.target.pdescription.value;
    let price=event.target.price.value;
    let qty=event.target.qty.value;
    contract.addProductInfo(name,description,price,qty);
  };

  const getCurrentVal = async () => {
    let val = await contract.getProduct(0);
    setCurrentContractVal(val.toString());
    console.log("Current Value:" + val);
  };

  
  const getDataFromContract = async () => {
    if (contract) {
      const dataCount = await contract.getDataCount();
      const newDataList = [];
      for (let i = 0; i < dataCount; i++) {
        const [name,description,price,qty] = await contract.getProduct(i);
        newDataList.push({name,description,price,qty});
      }
      setDataList(newDataList);
    }
  };

  return (
    <div>
      <h4> {"Get/Set Contract interaction"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div>
        <h3>Address: {defaultAccount}</h3>
      </div>
      <form onSubmit={setHandler}>      
        Product name<input type="text" id="pname" placeholder="Product Name"  /><br/>
        Description<input type="text" id="pdescription" placeholder="Product Description"/><br/>
        Price<input type="number" id="price" placeholder="Product Price"/><br/>
        Quantity<input type="number" id="qty" placeholder="Product Quantity" /><br/>
        <button type={"submit"}> Set Value </button>
      </form>
      <div>
        <button onClick={getCurrentVal} style={{ marginTop: "5em" }}>
          {" "}
          Get Value{" "}
        </button>
        <button onClick={getDataFromContract}>Get Values form other </button>
        <ul>
        {dataList.map((data,index) => (
          <li key={index}>
            Name: {data.name}, des: {data.description},Qty: {data.qty}      
          </li>
        ))}
      </ul>
      </div>
      {currentContractVal}
      {errorMessage}
    </div>
  );
};

export default SimpleStorage;
