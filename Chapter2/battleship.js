location1 = 3;
location2 = 4;
location3 = 5;

var guess;
var hits = 0;
var guesses = 0;
var isSunk = false;

while(isSunk ==false){ // Loop: while the ship is not sunk)
	
	guess = prompt("Ready ,aim, Shoot! ( enter a number from 0-6):"); // GET the user's guess

	if (guess < 0 || guess > 6){
		alert("請鍵入一個有效的數字！"); 
	}else{
		guesses = guesses +1  // add one to guessess
		
		if(guess ==location1 || guess == location2 || guess == location3){
			alert("Hint");
			hits = hits + 1;
			if(hits == 3){
			isSunk = true;
			alert("你擊沉了我的戰艦");
			}
		}else{
		alert("OH OH MISS");
	    }
	  }
	 }
	
	var stats =" 你猜了" + guesses + "次便極沈了戰艦," + "這意味著你的射擊準確率為 " + (3/guesses); //Tell user stats
	alert(stats);