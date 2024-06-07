import React, { useEffect, useState } from "react"
import ArtworkNFT_ABI from "./contract/royalti_abi.json";;
const ethers = require("ethers")

export default function Buyer() {
    let contractAddress = "0x47C3C7DbAC38491863Df9C3fd5136bd45E0E568a";

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [connButtonText, setConnButtonText] = useState("Connect Wallet");
  
    const [currentContractVal, setCurrentContractVal] = useState(null);
  
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
  

    const [tokid, setTokenId] = useState("");
    const [price, setCreditorPrice] = useState("");
    const [to, setTo] = useState("");
    const [trtokenid, setTrTokenId] = useState("");

  
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
  
    const setHandler = (event) => {
      event.preventDefault();
     contract.buyArtwork(tokid,price);
      console.log(tokid,price);
    };

    const setTransfer = (event) => {
        event.preventDefault();
       contract.safeTransfer(defaultAccount,to,trtokenid);
        console.log(defaultAccount,to,trtokenid);
      };
  
    // const getCurrentVal = async () => {
    //    let val = await contract.getArtwork(1);
    //    setCurrentContractVal(val.toString());
    //   console.log("Current Value:" + val);
    // };

  return (
    <center>
      <div className='border rounded mx-5 my-3'>
        <i><h2 className="my-3">Connection</h2></i>
        <button className={`btn btn-${!defaultAccount?'primary':'success'} my-4`} onClick={connectWalletHandler}>{!defaultAccount?'Click Here to Connect':'Connected to Metamask'}</button>
        <h5 style={{color:"green"}}>{defaultAccount}</h5>
    </div>  
    <h1>Resell</h1>
      <div className="border rounded my-3 mx-5">
        <form className="row g-3 my-3 mx-3" onSubmit={setHandler}>
          <div className="col-md-6">
            <label htmlFor="tokid" className="form-label">
              Token Id
            </label>
            <input type="number" className="form-control" id="tokid" value={tokid} onChange={(e) => setTokenId(e.target.value)}/>
          </div>
          <div className="col-md-6">
          <label htmlFor="price" className="form-label">
              New Price
            </label>
            <input type="number" className="form-control" id="price" value={price} onChange={(e) => setCreditorPrice(e.target.value)}/>
          </div>
          <div className="col-12">
            <button type={"submit"} className="btn btn-primary">
              Buy Artwork
            </button>
          </div>
        </form>
      </div>
      <h1>Transfer</h1>
      <div className="border rounded my-3 mx-5">
        <form className="row g-3 my-3 mx-3" onSubmit={setTransfer}>
          {/* <div className="col-md-6">
            <label htmlFor="from" className="form-label">
              From
            </label>
            <input  className="form-control" id="from" value={from} onChange={(e) => setFrom(e.target.value)}/>
          </div> */}
          <div className="col-md-6">
          <label htmlFor="to" className="form-label">
              To
            </label>
            <input className="form-control" id="to" value={to} onChange={(e) => setTo(e.target.value)}/>
          </div>
          <div className="col-md-6">
          <label htmlFor="trtokenid" className="form-label">
              Token Id
            </label>
            <input className="form-control" id="trtokenid" value={trtokenid} onChange={(e) => setTrTokenId(e.target.value)}/>
          </div>
          <div className="col-12">
            <button type={"submit"} className="btn btn-primary">
              Transfer 
            </button>
          </div>
        </form>
      </div>
    </center>
  );
}
