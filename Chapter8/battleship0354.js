var view = {
	displayMessage: function(msg){ //display 取得一個引數msg
		var messageArea = document.getElementById(("messageArea")); //使用DOM存取<div>元素
		messageArea.innerHTML = msg;
	},
		displayHit:function(location){         			 //設立displayHit物件
			var cell = document.getElementById(location);//location應該要和<td>元素的id相符合,這裡使用getElementById取得<td>的reference
			cell.setAttribute("class","hit"); 			 // 使用setAttribute把元素設定為hit ex:displayHit("34");

		},
		displayMiss: function(location){				//和displayHit原理相同
			var cell = document.getElementById(location);//把元素設定為miss方便把失誤圖加上去
			cell.setAttribute("class","miss");			

		}
	};
	//設立model物件可以用來保存遊戲狀態，和如何改變狀態邏輯有關
	//這邊從遊戲盤開始到船艦數量以及玩家是否命中和失誤開始
	//設立boardSize：網格大小為7
	//numShips : 3  船艦數量為3艘
	//ships:船艦的位置和擊中狀態必積集中數次
	//shipLength: 3 每艘船艦中位置數目
	//fire設立一個方法數
	var model = {
		boardSize: 7, //遊戲盤之網格大小
		numShips: 3, //遊戲中船艦的數目 只有三艘
		shipLength: 3, //每艘船艦的位置數目
		shipsSunk: 0, //多少船艦被擊沈

		ships:[ { locations:["06","16","26"],hits:["", "", ""]},
			    { locations:["24","34","44"],hits:["", "", ""]},
			    { locations:["10","11","12"],hits:["", "", ""]} ], ////船艦的位置以及擊中狀態
		fire: function(guess){
			for (var i = 0; i < this.numShips;i++){
				var ship = this.ships[i]; //先取到一艘船
				var locations = ship.locations;  //取得位置陣列 
                // 39行可以改成 ship.locations.indexOf(guess); 37,39行可以去掉
				var index = locations.indexOf(guess);   //locations裡面有guess猜測得值則傳回guess 
				if(index >=0){ //船被擊中
					ship.hits[index] = "hit"; //hits陣列寫入 "hit"
					view.displayHit(guess);
					view.displayMessage("Hit");
					if(this.isSunk(ship)){ //If isSunk return Ture then shipsSunk++
						view.displayMessage("You sank my battleship!");
						this.shipsSunk++;
					}
					return true; // 回報被打中
				}
			}
				view.displayMiss(guess);
				view.displayMessage("You missed. > <");
				return false; //沒打中回報false
		},
		isSunk:function(ship){
			for(var i = 0; i <this.length;i++){
				if(ship.hits[i] !== "hit"){
					return false; //其中一個不是hit 代表船沒有沉
				}
			}
			return true; //船沉表示true
		}
	};
	// 控制器的物件
	var controller = {
		guesses: 0 ,
		processGuess: function(guess){
			if(guess === null || guess.length !==2){
				alert("Oops,please enter a letter and a number on the board.");
			}

		}
	}

	function parseGuess(guess){
		var alphabet = ["A" ,"B" ,"C" , "D" , "E", "F", "G"];
		if(guess === null || guess.length !==2){
				alert("Oops,please enter a letter and a number on the board.");
		} else{
			firstChar = guess.charAt(0); //玩家第一個為字母
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1); //得到玩家輸入第二個數字
			if(isNaN(row) || isNaN(column)){
				alert("Oops,that isn't on the board.");
			}else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
				alert("Oops,that's off the board");

			}else{
				return row + column;
			}
		}
		return null;
	}
	console.log(parseGuess("A0"));
	console.log(parseGuess("B6"));
	console.log(parseGuess("G3"));
	console.log(parseGuess("H0"));
	console.log(parseGuess("A7"));
	