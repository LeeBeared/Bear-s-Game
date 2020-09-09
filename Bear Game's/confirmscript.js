"use strict";
/*
  
   Filename: confirmcript.js

   Author:  LeeWayne Barrineau
   Date:   11/16/2019
   
   Function List
   =============
   
      
   writeSessionValues()
      Writes data values from session storage in to the
      registration summary form
	
	companyTest()
		Test to see if a card company has been selected inside
		the form
	

*/

/*When the window load run the following*/
window.addEventListener("load", function() {
	
	//Create a new date object and 
	// change inner html of the id todayDate to that date
	var dateObject = new Date();
	document.getElementById("todayDate").innerHTML = dateObject.toLocaleString('en-US');
	
	
	//Call the write Session Values function
	writeSessionValues();
	
	/*When the element with the buttonSubmit is click 
		call the companyTest
	*/
   document.getElementById("buttonSubmit").onclick = companyTest;     
});
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
/* CompanyTest Test is a method that will
	test to see if a proper index has not been selected
	inside the productsBox element. If these is true 
	a customer validity message will be set to tell the user 
	so.*/
function companyTest() {
	/*Create an varaible to hold the productsBox element*/
   var cardCompany = document.getElementById("companyBox");
   
   /*Test to see if the an option has not been slected. By checking
   the value of the slected index
   */
   if (cardCompany.selectedIndex === -1) {
	    /*Set the a custom validity in cardCompany to 
	   tell the user that they need to selec a session package*/
      cardCompany.setCustomValidity("Please select a card company");
	/*For when  a proper index has been selected*/
   } else {
	    /*Set the a custom validity in cardCompany to a null string*/
      cardCompany.setCustomValidity("");
   }
}