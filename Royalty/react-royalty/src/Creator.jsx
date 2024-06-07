import React, { useEffect, useState } from "react";
import ArtworkNFT_ABI from "./contract/royalti_abi.json";
const ethers = require("ethers");

const Creator = () => {
  let contractAddress = "0x47C3C7DbAC38491863Df9C3fd5136bd45E0E568a";

  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [currentContractVal, setCurrentContractVal] = useState(null);

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [cradd, setCreatorAddress] = useState("");
  const [tokid, setTokenId] = useState("");
  const [crnm, setCreditorName] = useState("");
  const [crcnt, setCreatorContact] = useState("");
  const [artnm, setArtName] = useState("");
  const [roypr, setRoyaltyPercentage] = useState("");
  const [price, setCreditorPrice] = useState("");
  const [artworks, setArtwork] = useState([]);

  // State for handling resale popup form
  const [showResaleForm, setShowResaleForm] = useState(false);
  const [resaleTokenId, setResaleTokenId] = useState("");
  const [resalePrice, setResalePrice] = useState("");


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
        window.ethereum.removeListener(
          "accountsChanged",
          accountChangedHandler
        );
        window.ethereum.removeListener("chainChanged", chainChangedHandler);
      }
    };
  }, []);

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
    console.log("temp contract:" + tempContract);
  };

  const setHandler = (event) => {
    event.preventDefault();
    contract.mintArtwork(cradd, tokid, price, roypr, artnm, crnm, crcnt);
    console.log(cradd, tokid, price, roypr, artnm, crnm, crcnt);
  };


  const getCurrentVal = async () => {
    let val = await contract.getAllArtwork();
    setArtwork(val);
    console.log("Current Value:" + val);
  };

  const BuyHandler = async (tokenId, price) => {
    // Call the buyArtwork function of the contract
    try {
      await contract.buyArtwork(tokenId, price);
      console.log("Artwork bought successfully:", tokenId, price);
    } catch (error) {
      console.error("Error buying artwork:", error);
    }
  };

  // Function to handle resale of artwork
  const handleResale = async (tokenId, newPrice) => {
    try {
      // Call the resell function of the contract
      await contract.buyArtwork(tokenId, newPrice);
      console.log("Artwork resold successfully:", resaleTokenId, resalePrice);
      // Close the popup form
      setShowResaleForm(false);
    } catch (error) {
      console.error("Error reselling artwork:", error);
    }
  };


  return (
    <center>
      <div className="border rounded mx-5 my-3">
        <i>
          <h2 className="my-3">Connection</h2>
        </i>
        <button
          className={`btn btn-${!defaultAccount ? "primary" : "success"} my-4`}
          onClick={connectWalletHandler}
        >
          {!defaultAccount ? "Click Here to Connect" : "Connected to Metamask"}
        </button>
        <h5 style={{ color: "green" }}>{defaultAccount}</h5>
      </div>
      <div className="border rounded my-3 mx-5">
        <h1>Creator</h1>
        <form className="row g-3 my-3 mx-3" onSubmit={setHandler}>
          <div className="col-md-6">
            <label htmlFor="cradd" className="form-label">
              Creator Address
            </label>
            <input
              className="form-control"
              id="cradd"
              value={cradd}
              onChange={(e) => setCreatorAddress(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="tokid" className="form-label">
              Token Id
            </label>
            <input
              type="number"
              className="form-control"
              id="tokid"
              value={tokid}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="crnm" className="form-label">
              Creator Name
            </label>
            <input
              className="form-control"
              id="crnm"
              value={crnm}
              onChange={(e) => setCreditorName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="crcnt" className="form-label">
              Creator Contact
            </label>
            <input
              type="number"
              className="form-control"
              id="crcnt"
              value={crcnt}
              onChange={(e) => setCreatorContact(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="artnm" className="form-label">
              Art Name
            </label>
            <input
              className="form-control"
              id="artnm"
              value={artnm}
              onChange={(e) => setArtName(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="royper" className="form-label">
              Royalty Percentage
            </label>
            <input
              type="number"
              className="form-control"
              id="royper"
              value={roypr}
              onChange={(e) => setRoyaltyPercentage(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setCreditorPrice(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type={"submit"} className="btn btn-primary">
              Create Artwork
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="border rounded mx-5 my-3 table-responsive">
          <i>
            <h2 className="my-3">Get Artworks</h2>
          </i>
          <button onClick={getCurrentVal} className="btn btn-primary">
            Get All Artworks
          </button>
          <table className="table table-striped mx-5 my-3">
            <thead>
              <tr>
                <th>Token ID</th>
                <th>Price</th>
                <th>Creator Address</th>
                <th>Art Name</th>
                <th>Seller Name</th>
                <th>Seller Contact</th>
                <th>Sold</th>
                <th>Royalty Amount</th> 
                <th>Action</th>
                             
              </tr>
            </thead>
            <tbody>
              {artworks.map((artwork, index) => (
                <tr key={index}>
                  <td>{artwork.tokenId.toString()}</td>
                  <td>{artwork.price.toString()}</td>
                  <td>{artwork.creator.toString()}</td>
                  <td>{artwork.artName}</td>
                  <td>{artwork.sellerDetails.sellerName}</td>
                  <td>{artwork.sellerDetails.sellerContact}</td>
                  <td>{artwork.sold ? "Yes" : "No"}</td>
                  <td>{artwork.royaltyAmount.toString()}</td>
                  <td>
                  <button
                      className="btn btn-primary"
                      onClick={() => BuyHandler(artwork.tokenId,"0")}
                    >
                      Buy
                    </button>                  
                  </td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </center>
  );
};

export default Creator;
