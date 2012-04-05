// JavaScript Document
// Card Constructor
function Card(s, n) {
    var suit = s;
    var number = n;
    this.getNumber = function() {
        return number;
    };
    this.getSuit = function() {
      return suit;  
    };
    this.getValue = function() {
      if (number > 10) {
        return 10;
      } else if (number === 1) {
        return 11;
      } else {
          return number;
      }
    };
}

// deal function
var deal = function() {
  suit = Math.floor(Math.random()*4+1);
  rank = Math.floor(Math.random()*13+1);
  return new Card(suit, rank);
};

// hand constructor
function Hand() {
    var card1 = deal();
    var card2 = deal();
    var hand = [card1, card2];
    this.getHand = function() {
        return hand;
    };
    this.score = function() {
      var total = 0;
      var numAces = 0;
      for (i=0; i < hand.length; i++) {
        if ( hand[i].getValue() === 11 ) {
            numAces += 1;
        } 
        total += hand[i].getValue();
      }
      while (total > 21 && numAces !== 0) {
          total -= 10;  
      }
      return total;
    };
    this.printHand = function() {
        var showHand = "";
        var handNumber = "";
        var handSuit = "";
        // map suit back to symbol
        for (i = 0;i < hand.length; i++) {
            if (hand[i].getSuit() === 1) {
                handSuit = "Hearts";
            } else if (hand[i].getSuit() === 2) {
                handSuit = "Spades";
            } else if (hand[i].getSuit() === 3) {
                handSuit = "Clubs";
            } else if (hand[i].getSuit() === 4) {
                handSuit = "Diamonds";
            }
            
            //map number to face cards, ace
            if (hand[i].getNumber() === 11) {
                handNumber = "Jack";
            } else if (hand[i].getNumber() === 12) {
                handNumber = "Queen";
            } else if (hand[i].getNumber() === 13) {
                handNumber = "King";
            } else if (hand[i].getNumber() === 1) {
                handNumber = "Ace";
            } else {
                handNumber = hand[i].getNumber();
            }
            if (i < hand.length-1) {
            showHand += handNumber+" of "+handSuit+", ";
        } else {
            showHand += handNumber+" of "+handSuit;
        }
        
        }
        return showHand;
    };
    
    this.hitMe = function () {
      var hitCard = deal();
      hand.push(hitCard);
    };   
}

// dealer function
var playAsDealer = function() {
 var dealerHand = new Hand();
 while (dealerHand.score() < 17) {
    dealerHand.hitMe();
 }
 return dealerHand;
};
// play as user
var playAsUser = function () {
    var userHand = new Hand();
    var decision = confirm("Your hand is "+userHand.printHand()+" OK to Hit. Cancel to stay.");
    while (decision === true) {
        userHand.hitMe();
        decision = confirm(userHand.printHand()+" Hit again?");
    }
    return userHand;
};

//declare winner function
var declareWinner = function (userHand, dealerHand) {
    var userScore = userHand.score();
    var dealerScore = dealerHand.score();
    if (userScore > 21) {
        if (dealerScore > 21) {
            return "You tie!";
        } else 
            return "You lose!" ;
    }
    
    if (dealerScore > 21) {
        return "You win!";
    }
    
    if (userScore > dealerScore) {
        return "You win!";
    } else if (userScore === dealerScore) {
        return "You tie!";
    } else 
        return "You lose!";
};

//wrap it all up in one last playGame function
var playGame = function() {
  var userHand = playAsUser();
  var dealerHand = playAsDealer();
  var winMessage = declareWinner(userHand, dealerHand);
  console.log("Dealer has "+dealerHand.printHand());
  console.log("You have "+userHand.printHand());
  console.log(winMessage);
  alert(winMessage);
};

playGame();