var access =
	document.getElementById("code9"); // document物件之getElementById方法所得到的結果，傳入的引數為 ”“
var code = access.innerHTML; // access使用innerHtml屬性取得元素內容

code = code + " mindnight";

alert(code);