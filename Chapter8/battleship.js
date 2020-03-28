
//因為要看見玩家輸入以及遊戲狀況，所以設立 view物件
//設定分成三個部分，第一個displayMessage部分，遊戲畫面左上角顯示文字訊息
//如果model船艦被hit到view物件也必須更新







var view = {
	displayMessage: function(msg){ //display 取得一個引數msg
		var messageArea = document.getElementById(("messageArea")); //從頁面取得messageArea元素
		messageArea.innerHTML = msg;
	},
		displayHit:function(location){         			 //設立一個displayHit物件
			var cell = document.getElementById(location);//設立cell的變數取得ships's location
			cell.setAttribute("class","hit"); 			 // 使用setAttribute的方法知道hit

		},
		displayMiss: function(location){					
			var cell = document.getElementById(location);
			cell.setAttribute("class","miss");			//使用setAttribute的方法miss的類別

		}
	};
	/*
	view.displayMiss("00");
	view.displayHit("34");
	view.displayMiss("55");
	view.displayHit("12");
	view.displayMiss("25");
	view.displayHit("26");
	view.displayMessage("Tap tap, is this thing on");
	*/
	//設立model物件可以用來保存遊戲狀態，和如何改變狀態邏輯有關
	//這邊從遊戲盤開始到船艦數量以及玩家是否命中和失誤開始
	//設立boardSize：網格大小為7
	//numShips : 3  船艦數量為3艘
	//ships:船艦的位置和擊中狀態必積集中數次
	//shipLength: 3 每艘船艦中位置數目
	//fire設立一個方法數
	var model = {
		boardSize: 7, //遊戲盤之網格大小
		numShips: 3, //遊戲中船艦的數目
		shipLength: 3, 
		shipsSunk: 0, //多少船艦被擊沈

		ships:[{ locations:["06","16","26"],hits:["", "", ""]},
			  { locations:["24","34","44"],hits:["", "", ""]},
			  { locations:["10","11","12"],hits:["", "", ""]} ], ////船艦的位置以及擊中狀態
			  
		fire: function(guess){ //取的玩家的guess
			for(var i =0; i <this.numShips;i++){ //會檢查所有船艦的數,一次只檢查一艘
			var ship = this.ships[i]; 
			var index = ship.locations.indexOf(guess); //index為玩家猜測的船的位置，正確傳回索引值否則return -1
				if(index >=0){
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Hit");
				if (this.isSunk(ship)){
					view.displayMessage("You sank my battleship!");
					this.skipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed");
		return false;
	},
	isSunk: function(ship){
			for(var i = 0; i< this.shipLength;i++){
				if(ship.hits[i] !=="hit"){
					return false;
				}
			}
				return true;
		}

	};
/*
model.fire("53"); // miss

model.fire("06"); // hit
model.fire("16"); // hit
model.fire("26"); // hit

model.fire("34"); // hit
model.fire("24"); // hit
model.fire("44"); // hit

model.fire("12"); // hit
model.fire("11"); // hit
model.fire("10"); // hit
*/
	
// testing parseGuess
function parseGuess(guess){
	var alphabet = ["A","B","C","D","E","F","G"];

	if(guess === null || guess.length !==2){
		alert("oops,Please enter a letter and a number on the board.");

	}else {
		firstChar = guess.charAt(0); //charAt會取得一個整數,從玩家第一個數字取得字母
		var row = alphabet.indexOf(firstChar);
		console.log(row);
		var column = guess.charAt(1); //從玩家二個數字取得column
		console.log(column);

		if(isNaN(row) || isNaN(column) ){
			alert("Oops, that isn't on the board.");
		}else if (row < 0 || row >= model.boardSize|| column < 0 || column >= model.boardSize ) {
	alert("Oops, that's off the board");
		}else {
			return row + column;
		}
	}
	return null;
}
// cpntroller控制器^^
var controller = {
	guesses: 0,
	processGuess: function(guess){ //取得玩家所有的猜測
		var location = parseGuess(guess);
		if(location){
			this.guessess++;
			var hit = model.fire(location);
			if(hit && model.shipSunk === model.numShips){
				view.displayMessage("You sank all my battleship, in" + this.guesses + "guesses");
			}
		}
	}
}

function init(){
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick=handleFirebutton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
}

function handleFirebutton(){
	var guessInput = document.getElementById(("guessInput"));
	var guess = guessInput.value;
	controller.processGuess(guess);

	guessInput.value ="";


}
window.onload = init;

function handleKeyPress(e){
	var fireButton = document.getElementById("fireButton");
	if(e.keycode === 13){
		fireButton.click();
		return false;
	}
}

