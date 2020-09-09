"use strict";
/*
  
   Filename: gamescript.js

   Author:  LeeWayne Barrineau
   Date:   11/17/2019
   
   Function List
   =============
   
  

*/
/* Create varaibles that hold the base values 
	for the user hand and their points bank
*/
var baseHand = 0; var baseBank=1000;

/*When the window load run the following*/
window.addEventListener("load", playCountUp);
function playCountUp() {
	
   /* Create varaibles to hold object that have the following 
		ids dealCards,standHand,resetGame,handValue,pointsBank
	  Then create a varaible to hold all elements that are apart of 
			the cardimg class
	  Next, create varaibles that hold the value of the handValue and bankBox
	       as numbers
	  Then, create varaibles that will be running total for this varaibles
	  Finally set bankBox to the base bank varaible
   */
   var dealButton = document.getElementById("dealCards");
   var standButton = document.getElementById("standHand");
   var resetButton = document.getElementById("resetGame");
   var handValue = document.getElementById("handValue");
   var bankBox = document.getElementById("pointsBank");
   var cardImages = document.querySelectorAll("img.cardImg");
   var handBoxValue=Number(handValue.text);
	var bankBoxValue = Number(bankBox.text);
   var handPoints=0;
	var bankValue=0;
	bankBox.value = baseBank;
	
   /*Create a instance of the card Deck
     class and call the shuffle method inside the instance */
   var myDeck = new cardDeck();
   myDeck.shuffle();
   
   /*Create a instance of the card hand class
	  with a length of 5
   */
   var myHand = new cardHand(5);
      
   
  /* Add event listener to the reset button so that when the button is clicked
		This will reset hand value and bank box to the base values
		Also it will enable the deal button and disable the stand button
  */
   resetButton.addEventListener("click", function() {
      handValue.value = baseHand;
      bankBox.value = baseBank;
      enableObj(dealButton);
      disableObj(standButton);
   });
   
   /*Add event listener to the deal button so that when the button is clicked
   */
   dealButton.addEventListener("click", function() {
      
	  
	  /* For to loop though the card images array
	  */
	  for(var i = 0; i < cardImages.length; i++){
			//Set the src for all indexs in card images to the card back pic file
			  cardImages[i].src = "ag_cardback.png";
		 }
		 /* Set hand Value to base hand 
			Also disable the deal and enable the standButton
		 */
         handValue.value = baseHand;
         disableObj(dealButton);
         enableObj(standButton);
         
         /*Check to see if the there are less than
			5 cardArray in the deck.
			If so set my deck to a new card deck and shuffle the deck
		 */
         if (myDeck.cardArray.length < 5) {
            myDeck = new cardDeck();
            myDeck.shuffle();
         } 
		 /*Deal cardArray to the hand*/
         myDeck.dealTo(myHand);
		 
		 
		 
		 
         /*For loop to loop though the cardArray*/
         for (var i = 0; i < cardImages.length; i++) {
            
            /*Set the index for the current card to the value of i*/
            cardImages[i].index = i;
		
			/* Check to see if i is greater than 1 since 
			these cardArray needs to be able to be clicked
			*/
			if(i>1){
				cardImages[i].src="ag_cardback.png";
				cardImages[i].onclick = function(e) {
					
				  /*Flip the card over by changing the src 
						to the cardImage inside the hand that equals the index 
						of the target 
				  */
                  e.target.src = myHand.cardArray[e.target.index].cardImage();
				  
				  /* Check to see if the rank value of the card
				     is under 10
				  */
				  if(myHand.cardArray[e.target.index].rankValue<10){
					  /* Add the rank value to the hand Points varaible
					  */
					  handPoints+=myHand.cardArray[e.target.index].rankValue;
				  
				  /* Check to see if the rank value of the card
				     is 10,11,12 
				  */
				  }else if(myHand.cardArray[e.target.index].rankValue>=10&&
							myHand.cardArray[e.target.index].rankValue<13){
						/*Add 10 to the hand points
						  Since these card are Jack,Queen,King and are worth 10 points*/
						handPoints+=10;
						
				  /*For Ace add 11 points to the hand Points */
				  }else{handPoints+=11;}
				  /*Add handBoxValue plus the hand points to the hand value*/
					handValue= handBoxValue+handPoints;		
				  
				  
				}
			//For the cardArray that don't need to be clicked
			}else {
				/*Show the front face of the card */
				cardImages[i].src=myHand.cardArray[i].cardImage();
				
				/* Check to see if the rank value of the card
				     is under 10
				  */
				  if(myHand.cardArray[e.target.index].rankValue<10){
					  /* Add the rank value to the hand Points varaible
					  */
					  handPoints+=myHand.cardArray[e.target.index].rankValue;
				  
				  /* Check to see if the rank value of the card
				     is 10,11,12 
				  */
				  }else if(myHand.cardArray[e.target.index].rankValue>=10&&
							myHand.cardArray[e.target.index].rankValue<13){
						/*Add 10 to the hand points
						  Since these card are Jack,Queen,King and are worth 10 points*/
						handPoints+=10;
						
				  /*For Ace add 11 points to the hand Points */
				  }else{handPoints+=11;}
				  /*Add handBoxValue plus the hand points to the hand value*/
					handValue= handBoxValue+handPoints;			
			}
		}        
         }
		 );
   

   /* For when the stand button is clicked the 
   deal button should be enable and the stand should be disable
   */
   standButton.addEventListener("click", function() {
	  /* Enable the deal and disable stand buttons
	  */
      enableObj(dealButton);
      disableObj(standButton);
	  
	  
	  /* If hand points is over 30 the user loses 50 points.
		 If it equals 30 add 200 to the bankValue.
		 If 28 or 29 add 150 to the bankValue.
		 If 26 or 27 add 150 to the bankValue.
		 If 24 or 25 add 150 to the bankValue.
		 If 22 or 23 add 150 to the bankValue.
		 If under 22 minus 25 from the bankValue.
	  */
      if(handPoints>30){
		  bankValue=-50;
	  }else if(handPoints==30){
		   bankValue=200;
	  }else if(handPoints==28||handPoints==29){
		   bankValue=250;
	  }else if(handPoints==26||handPoints==27){
		   bankValue=100;
	  }else if(handPoints==24||handPoints==25){
		   bankValue=50;
	  }else if(handPoints==22||handPoints==23){
		   bankValue=25;
	  }else if(handPoints<22){
		  bankValue=-25;
	  }
	  /* Set bank box to be bankBoxValue+bankValue
	  */
	  bankBox= Number(bankBoxValue+bankValue);   
   });   
   
   /* Function that will disable an object
   */
   function disableObj(obj) {
	   /*Disable the object and set opacity to .25*/
      obj.disabled = true;
      obj.style.opacity = 0.25;
   }

    
   /* Function that will enable an object
   */
   function enableObj(obj) {
	    /*Enable the object and set opacity to 1*/
      obj.disabled = false;
      obj.style.opacity = 1;
   } 
}

/*Function that will be used to create a card*/
function gameCard(cardSuit, cardRank) {
   /*Set the suit of the card to the parameter cardSuit*/
   this.suit = cardSuit;
   /*Set the rank of the card to the parameter cardRank*/
   this.rank = cardRank;
   /*Set rankValue to null*/
   this.rankValue = null;
}

/*Create a card image method for the gameCard class
*/
gameCard.prototype.cardImage = function() {
	//Create a string based on the suit and rankValue of the card
  var cardNonFileExt = this.suit.toLowerCase() + this.rankValue
  //Return the varaible plus the file extention
  return cardNonFileExt + ".png";
};

/*Create function that will be used to create a deck of cardArray*/
function cardDeck() {
	//Create an array called cardArray with a length of 53
   this.cardArray = new Array(52);

	/* Create a varaibles that hold the first letter of each suit
       Also create an array that hold the cardRanks of the cardArray
	*/
    var cardSuits = ["C", "D", "H", "S"];
   var cardRanks = ["2", "3", "4", "5", "6", 
                "7", "8", "9", "10", 
                "Jack", "Queen", "King", "Ace"];
   //Create a card count varaible 
   var cardCount = 0;
   
   /*Create a double for loop that will loop though the cards suits and 
     card ranks arrays*/
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 13; j++) {
		  
		 /*For the current index inside the card Array make a new gameCard
		 that is based of the current index inside cardSuits and cardRank*/
         this.cardArray[cardCount] = new gameCard(cardSuits[i], cardRanks[j]);
		 /*Set rank value to be j plus 2*/
         this.cardArray[cardCount].rankValue = j+2;
		 /*Add one to cardCount*/
         cardCount++;
      }
   }
   
   /*Create a metod that will shuffle the deck*/
   this.shuffle = function() {
	   /*Sort cardArray based on a randome value
	   */
      this.cardArray.sort(function() {
         return 0.5 - Math.random();
      });
   };
   
   /*Create a method that will deal cards into the hand*/
   this.dealTo = function(cardHand) {
	   /*Loop though the hand and place a card into it*/
      for (var i = 0; i < cardHand.cardArray.length; i++) {
         cardHand.cardArray[i] = this.cardArray.shift();
      }
   };
}
/*Function that will create a card hand that is based 
on the parameter hadn Length*/
function cardHand(handLength) {
	/*Set cardArray to be a new array whos length
	is the parameter handLength*/
   this.cardArray = new Array(handLength);
}
