///因為要看見玩家輸入以及遊戲狀況，所以設立 view物件
//設定分成三個部分，第一個displayMessage部分，遊戲畫面左上角顯示文字訊息
//第二個部分displayHit,
//如果model船艦被hit到view物件也必須更新
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
	//view.displayMiss("00");
	//view.displayHit("11");

	var ships = [{ locations:["31","41","51"],hits:["","",""]},
				 { locations:["14","24","34"],hits:["","hit",""]},
				 { locations:["00","01","2"],hits:["hit","",""] }];

	var ship2 = ships[1]; //取得第二艘船艦
	var locations = ship2.locations; //中間位置

	console.log("Location is " + locations[1] );

	var ship3 = ships[2]; //取得第三艘船艦
	var hits = ship3.hits; //第一個位置是否命中
	if( hits[0]==="hit"){
		console.log("Ouch, hit on third ship at location one");
	}
	var ship1 = ships[0];
	var hit = ship1.hits;
	hits[2] = "hit";


	


	