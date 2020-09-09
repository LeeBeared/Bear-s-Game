"use strict";

/*

   Author:  LeeWayne Barrineau
   Date:   11/17/2019

   Filename: countupcards.js


   Custom Object Classes
   

   cardDeck
      The cardDeck object contains an array of poker cards and methods
      for shuffling and drawing cards from the deck.

   cardHand
      The cardHand object contains an array of poker cards drawn from a
      poker deck. The methods associated with the object include the ability 
      to calculate the value of the hand and to mark cards to be discarded,
      replaced with new cards from a poker deck.

   gameCard
      The gameCard object contains properties and methods associated with
      individual poker cards including the card rank, suit, and value.
   
	
*/
/* Constructor function for poker cards */
function gameCard(cardSuit, cardRank) {
   this.suit = cardSuit;
   this.rank = cardRank;
   this.rankValue = null;
   this.cardWorth=null;
}

/* Method to reference the image source file for a card */
gameCard.prototype.cardImage = function() {
	alert(this.suit.toLowerCase() + this.rankValue + ".png";);
  return this.suit.toLowerCase() + this.rankValue + ".png";
  
};

/* Constructor function for poker decks */
function cardDeck() {
   this.cards = new Array(52);

    var suits = ["C", "D", "H", "S"];
   var ranks = ["2", "3", "4", "5", "6", 
                "7", "8", "9", "10", 
                "Jack", "Queen", "King", "Ace"];

   var cardCount = 0;
   for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 13; j++) {
         this.cards[cardCount] = new gameCard(suits[i], ranks[j]);
		 
         this.cards[cardCount].rankValue = j+2;
		 

		 
		 
         cardCount++;
      }
   }
   
   // Method to randomly sort the deck
   this.shuffle = function() {
      this.cards.sort(function() {
         return 0.5 - Math.random();
      });
   };
   
   // Method to deal cards from the deck into a poker hand
   this.dealTo = function(cardHand) {
      for (var i = 0; i < cardHand.cards.length; i++) {
         cardHand.cards[i] = this.cards.shift();
      }
   };
}
/* Constructor function for poker hands */
function cardHand(handLength) {
   this.cards = new Array(handLength);
   
   
}

