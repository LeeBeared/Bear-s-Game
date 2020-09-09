"use strict";
/*
  
   Filename: buyscript.js

   Author:  LeeWayne Barrineau
   Date:   11/16/2019
   
   Function List
   =============
   
   productsTest()
      Performs a validation test on the selection of the product
   
   calcCart()
      Calculates the cost of the products and saves data
      in session storage
      
   writeSessionValues()
      Writes data values from session storage in to the
      shopping aside.

*/
//Variable for Sales Tax
var saleTaxBase =0.11;

/*When the window load run the following*/
window.addEventListener("load", function() {
	
	//Create a new date object and 
	// change inner html of the id todayDate to that date
	var dateObject = new Date();
	document.getElementById("todayDate").innerHTML = dateObject.toLocaleString('en-US');
	
   //Call calcCart method
	calcCart();
  
  //When the buttonSubmit is click the products Test is called
   document.getElementById("buttonSubmit").onclick = productsTest;  

	/* When either the firstBox,lastBox,emailBox,quantityBox,phoneBox
						or productsBox
		are changed by onblur or onchanged the
		calcCart should be ran to show what the user has done so far
	*/
   document.getElementById("firstBox").onblur = calcCart;
   document.getElementById("lastBox").onblur = calcCart; 
   document.getElementById("emailBox").onblur = calcCart;    
   document.getElementById("quantityBox").onchange = calcCart;   
   document.getElementById("productsBox").onchange = calcCart;    
});
/* Products Test is a method that will
	test to see if a proper index has not been selected
	inside the productsBox element. If these is true 
	a customer validity message will be set to tell the user 
	so.*/
function productsTest() {
	/*Create an varaible to hold the productsBox element*/
   var productsIndexs = document.getElementById("productsBox");
   
   /*Test to see if the an option has not been slected. By checking
   the value of the slected index
   */
   if (productsIndexs.selectedIndex === -1) {
	    /*Set the a custom validity in productsIndexs to 
	   tell the user that they need to selec a session package*/
      productsIndexs.setCustomValidity("Please select a product");
	/*For when  a proper index has been selected*/
   } else {
	    /*Set the a custom validity in productsIndexs to a null string*/
      productsIndexs.setCustomValidity("");
   }
}

/* Calc Cart will set data inside the sessionStorage element*/
function calcCart() {
	
	/*Set customerName of sessionStorage to equal value of the
		first and last name elements in the purchaseForm*/
   sessionStorage.customerName = document.forms.purchaseForm.elements.firstBox.value + " " + document.								forms.purchaseForm.elements.lastBox.value;

	/*Set customerMail of sessionStorage to equal emailBox element in the purchaseForm*/
   sessionStorage.customerMail = document.forms.purchaseForm.elements.emailBox.value;

	/*Set customerMail of sessionStorage to equal the value of
		quantityBox element in the purchaseForm*/
   sessionStorage.customerQuantity = document.forms.purchaseForm.elements.quantityBox.value;

	/*Create a varaible to hold the slected index 
	inside the productsBox element*/
   var selectedProduct = document.getElementById("productsBox").selectedIndex;
   
   /*Test to see if a product has been selected by
		testing to see if the selectedProduct does not equal -1*/
   if (selectedProduct !== -1) {
	   //Set the customerProduct to the text of the selectedProduct inside the productsBox
      sessionStorage.customerProduct = document.forms.purchaseForm.elements.productsBox[selectedProduct].text;
	  
	  //Set the customerProductCost to the value of the selectedProduct inside the productsBox
      sessionStorage.customerProductCost = document.forms.purchaseForm.elements.productsBox[selectedProduct].value;
	  
	/*For when a product has not been selected*/
   } else {
	   /*Set customerProduct of the sessionStorage to a blank string
	     Also set the customerProductCost to 0*/
      sessionStorage.customerProduct = "";
      sessionStorage.customerProductCost = 0;
   }
   
   /* Create a varaible to hold the total tax which is 
		the customer Product Cost times the customerQuantity then 
		times that number by the saleTaxBase
   */
   var taxTotal = (parseFloat(sessionStorage.customerProductCost)* parseFloat(							sessionStorage.customerQuantity))*saleTaxBase;
   
   /* Create a varaible to hold the customer's total which is 
		the customer Product Cost times the customerQuantity then 
		add taxTotal to that number 
   */
   var customerTotal = parseFloat(sessionStorage.customerProductCost)* parseFloat(							sessionStorage.customerQuantity)+ parseFloat(sessionStorage.taxTotal);
   //Check to see if taxTotal is greater than 0
   if(taxTotal >0){
		/* Set taxTotal inside sessionStorage to the varaible taxTotal 
			after its been set to only have 2 places right of the decimal
		*/
		sessionStorage.taxTotal = taxTotal.toFixed(2);}
		
	/*If under zero set it to 0*/
   else{ sessionStorage.taxTotal =0.00;
   }
   //Check to see if customerTotal is greater than 0
   if(customerTotal >0){
	   /* Set customerTotal inside sessionStorage to the varaible customerTotal 
			after its been set to only have 2 places right of the decimal
		*/
		sessionStorage.customerTotal = customerTotal.toFixed(2);}
	/*If under zero set it to 0*/
   else{ sessionStorage.customerTotal =0.00;
   }
   
   //Call the write Session values
   writeSessionValues(); 
}
/* Write Session values will set the 
	text content of certain elements to
	a corrsponding data inside the
	session Storage*/
function writeSessionValues() {
   
    /* Set content inside the element with the id shoppingName to  be
		the value of the customerName of sessionStorage*/
   document.getElementById("shoppingName").textContent = sessionStorage.customerName;
   
   /* Set content inside the element with the id shoppingEmail to  be
		the value of the customerMail of sessionStorage*/
   document.getElementById("shoppingEmail").textContent = sessionStorage.customerMail;
   
   /* Set content inside the element with the id shoppingProduct to  be
		the value of the customerProduct of sessionStorage*/
   document.getElementById("shoppingProduct").textContent = sessionStorage.customerProduct;
   
   /* Set content inside the element with the id shoppingBasePrice to  be
		the value of the customerProductCost of sessionStorage*/
   document.getElementById("shoppingBasePrice").textContent = "$"+sessionStorage.customerProductCost;

	/* Set content inside the element with the id shoppingQuantity to  be
		the value of the customerQuantity of sessionStorage*/   
   document.getElementById("shoppingQuantity").textContent = sessionStorage.customerQuantity;
   
   /* Set content inside the element with the id shoppingTax to  be
		the value of the taxTotal of sessionStorage*/   
   document.getElementById("shoppingTax").textContent = "$"+sessionStorage.taxTotal;
   
   /* Set content inside the element with the id shoppingTotal to  be
		the value of the customerTotal of sessionStorage*/
   document.getElementById("shoppingTotal").textContent = "$" + sessionStorage.customerTotal;
}


