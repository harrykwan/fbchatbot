import { settings } from "cluster";

//	https://m.facebook.com/messages/

// https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier=


// getpostid 
var allarticle = document.getElementsByTagName('article')
for (var j=0; j<allarticle.length; j++){
	if (document.getElementsByTagName('article')[j].getElementsByTagName(
		'footer')[0]){
			console.log(j)
			console.log(document.getElementsByTagName('article')[j].innerText)
			console.log('https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier='+document.getElementsByTagName('article')[j].getElementsByTagName(
				'footer')[0].getElementsByTagName('div')[0].id.replace('feedback_inline_',''))
		}
}


// getlist
function getreactionlist(){
	var mywaitfunc = setInterval(function(){

		if (document.getElementsByClassName('content')[0]){
			document.getElementsByClassName('content')[0].click()
		} else {
			clearInterval(mywaitfunc)
			var allreactpeople = document.getElementsByClassName('_4mn c');
			for (var j=0; j<allreactpeople.length; j++){
				console.log(allreactpeople[j].getElementsByTagName('a')[0].href)
			}
			
		}
	}, 500);
}




///message
// document.getElementsByClassName('_56bz _54k8 _5c9u _5caa')[3].href
var allprofilebutton = document.getElementsByTagName('a');
for (var j=0; j<allprofilebutton.length; j++){
	if (allprofilebutton[j].href){
		if (allprofilebutton[j].href.indexOf("thread")!=-1){
			console.log(allprofilebutton[j])
		}
	}
}



//get message frd list (expand)
if (!frdlistjson)
var frdlistjson = {};
if (!expandtimes_frd)
var expandtimes_frd = 5;

function getallname(){
	var mymessagelist = document.getElementsByClassName("_55wp _7om2 _5b6o _67ix _2ycx acw del_area async_del abb touchable _592p _25mv");
	var oldlength = mymessagelist.length; 
	document.getElementsByClassName("title mfsm fcl")[0].click()
	var mywaitfunc = setInterval(function(){
		if (mymessagelist.length>oldlength){
			clearInterval(mywaitfunc);
			expandtimes_frd--;
			if (expandtimes_frd>0){
				getallname();
			} else {
				for (var j=0; j<mymessagelist.length; j++){
					console.log(mymessagelist[j].parentNode.innerText)
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




//get into chat room
function choosefrd(chosenfrd){
	frdlistjson[chosenfrd].dom.getElementsByTagName("a")[0].click()
}



//expand messages
if (!expandtimes_message)
var expandtimes_message = 5;
var mychatlist = document.getElementsByClassName("voice acw");
if (!mychatrecord)
var mychatrecord = [];

function getallmessage(){
	if (document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0])
		document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0].click()
	var mywaitfunc = setTimeout(function(){
		if (expandtimes_message>0&&document.getElementsByClassName("_2so _2sq _2ss img _50cg async_throbber async_saving_visible")[0]){
			expandtimes_message--;
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




//send
function sendmessage(mymessage){
	document.getElementById('composerInput').value = mymessage
	var testkey = new KeyboardEvent("keydown", {
	    bubbles: true, cancelable: true, keyCode: 13
	});
	document.getElementById('composerInput').dispatchEvent(testkey);
	document.getElementsByTagName("button")[2].click()
}


//search
function search(x){
	document.getElementsByTagName('a')[4].click()
	document.getElementById('main-search-input').value = x//"ven bot"
	var testkey = new KeyboardEvent("keydown", {
	    bubbles: true, cancelable: true, keyCode: 13
	});
	document.getElementById('main-search-input').dispatchEvent(testkey)
}


//self profile
function gotomyprofile(){
	document.getElementsByTagName('a')[5].click()
	var myinterval = setInterval(() => {
		var alla = document.getElementsByTagName("a")
		for (var j=0; j<alla.length; j++){
			if (alla[j].href.indexOf("?ref=bookmarks")!=-1){
				console.log(alla[j].click());
				clearInterval(myinterval)
				break;
			}
		}
	}, 500);
	
}


getallname();
choosefrd("Cynthia Ka Yi")
getallmessage();
sendmessage("hi")




