//	https://m.facebook.com/messages/

//get message frd list (expand)
var frdlistjson = {};
var expandtimes = 5;
var mymessagelist = document.getElementsByClassName("_55wp _7om2 _5b6o _67ix _2ycx acw del_area async_del abb touchable _592p _25mv");
function getallname(){
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
					frdlistjson[mymessagelist[j].innerText.split("\n")[0]] = mymessagelist[j];
					// console.log(mymessagelist[j].innerText.split("\n")[0])
					return frdlistjson;
				}
			}
			
		} 
	}, 500);
}
var myfrdlist = getallname();
console.log(myfrdlist);

//get into chat room
var chosenfrd = "Cynthia Ka Yi"
frdlistjson[chosenfrd].getElementsByTagName("a")[0].click()

//expand messages
document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0].click()


//send
var mymessage = "hi"
document.getElementById('composerInput').value = mymessage
var testkey = new KeyboardEvent("keydown", {
    bubbles: true, cancelable: true, keyCode: 13
});
document.getElementById('composerInput').dispatchEvent(testkey);
document.getElementsByTagName("button")[2].click()
