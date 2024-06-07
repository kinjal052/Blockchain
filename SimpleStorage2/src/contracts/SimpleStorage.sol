// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Productsinfo {
    struct Product {
        string productname;
        string productdescription;
        uint price;
        uint qty;
    }
    // struct Cartitem{
    //     string productname;
    //     string productdescription;
    //     uint price;
    //     uint qty;
    // }
      uint totalamt;
    // An array of product structs
    Product[] public prod;
    // Cartitem[] public cart;

    //define event
    event ProductAdded(string _pname,string _pdescription,uint _pric, uint _qty)  ;
    event ProductUpdated(uint indexed index, string productName, uint price);


    function addProductInfo(string memory _pname,string memory _pdescription,uint _price,uint _qty) public {
        
        prod.push(Product(_pname,_pdescription,_price,_qty));
        emit ProductAdded(_pname,_pdescription, _price,_qty);
    }

   // Update product info
    function updateProduct(uint _index, string memory _pname, string memory _pdescription, uint _price) public {
        require(_index < prod.length, "Invalid index");

        Product storage p = prod[_index];
        p.productname = _pname;
        p.price = _price;
        p.productdescription = _pdescription;

        emit ProductUpdated(_index, _pname, _price); // Emit event when product is updated
    }

    // Get product info
    function getProduct(uint _index) public view returns (string memory, string memory, uint) {
        require(_index < prod.length, "Invalid index");

        Product storage p = prod[_index];
        return (p.productname, p.productdescription, p.price);
    }

    // Calculate total amount
    function calculateTotalAmount() public view returns (uint) {
        uint total = 0;
        for (uint i = 0; i < prod.length; i++) {
            total += prod[i].price * prod[i].qty;
        }
        return total;
    }
    // function addToCart(uint256 _index,uint _qty)public{
    //     Product storage p = prod[_index];
    //     cart.push(Cartitem(p.productname,p.productdescription,p.price,_qty)); 
    // }
    // function totalamount(uint256 _index) public  returns (uint256){
    //      Cartitem storage c = cart[_index];
    //     totalamt=c.price*c.qty;
    //     return totalamt;
    // }
}