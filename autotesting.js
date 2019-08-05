//	https://m.facebook.com/messages/

//get message frd list (expand)
var frdlistjson = {};
var expandtimes = 5;

function getallname(){
	var mymessagelist = document.getElementsByClassName("_55wp _7om2 _5b6o _67ix _2ycx acw del_area async_del abb touchable _592p _25mv");
	var oldlength = mymessagelist.length;
	document.getElementsByClassName("title mfsm fcl")[0].click()
	var mywaitfunc = setInterval(function(){
		if (mymessagelist.length>oldlength){
			clearInterval(mywaitfunc);
			expandtimes--;
			if (expandtimes>0){
				getallname();
			} else {
				for (var j=0; j<mymessagelist.length; j++){
					frdlistjson[mymessagelist[j].innerText.split("\n")[0]] = {};
					frdlistjson[mymessagelist[j].innerText.split("\n")[0]].dom = mymessagelist[j];
					frdlistjson[mymessagelist[j].innerText.split("\n")[0]].time = mymessagelist[j].innerText.split("\n")[2];
					frdlistjson[mymessagelist[j].innerText.split("\n")[0]].index = j;
				}
				console.log(frdlistjson);
			}
			
		} 
	}, 500);
}
getallname();








//get into chat room
var chosenfrd = "Cynthia Ka Yi"
frdlistjson[chosenfrd].dom.getElementsByTagName("a")[0].click()








//expand messages
var expandtimes = 5;
var mychatlist = document.getElementsByClassName("voice acw");
var mychatrecord = [];

function getallmessage(){
	if (document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0])
		document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0].click()
	var mywaitfunc = setTimeout(function(){
		if (expandtimes>0&&document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0]){
			expandtimes--;
			getallmessage();
		} else {
			for (var j=0; j<mychatlist.length; j++){
				var tempchatlist = mychatlist[j].getElementsByClassName("_1c-b _34ee _3_5q _34eo");
				var tempchatrecord = {};
				tempchatrecord.name = JSON.parse(mychatlist[j].dataset.store).name
				tempchatrecord.data = [];
				for (var k=0; k<tempchatlist.length; k++){
					if (tempchatlist[k]){
						tempchatrecord.data.push(tempchatlist[k].innerText);
					}
				}
				mychatrecord.push(tempchatrecord)
			}
			console.log(mychatrecord)
		}
	}, 500);
	
}
getallmessage();










//send
var mymessage = "hi"
document.getElementById('composerInput').value = mymessage
var testkey = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 13
});
document.getElementById('composerInput').dispatchEvent(testkey);
document.getElementsByTagName("button")[2].click()
