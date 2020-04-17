// console.log(window.location.href)
var messagebody,treedata,chatbotmessagelist
chrome.storage.sync.get(['action','messagebody','treedata','chatbotmessagelist','chatbot'], function(result) {
    console.log(result)
    messagebody = result.messagebody
    treedata = result.treedata
    if (result.chatbotmessagelist){
        chatbotmessagelist = result.chatbotmessagelist
    } else {
        chatbotmessagelist = {}
    }
    // console.log(findtree(treedata[0],'有冇興趣試下其他品牌的魚油？'))
    if (result.action=='monpost'){
        monpost()
        // chatbot()
    } 
    if (result.chatbot=='on'){
        chatbot()
    }
});

var findtreeans
function findtree(x,target){
    // console.log(x.q,target)
    if (findtreeans) return findtreeans
    if (x.q==target){
        console.log(x)
        findtreeans = x
        return x
    } else {
        if (x.c){
            for (var j=0; j<x.c.length; j++){
                findtree(x.c[j],target)
            }
        }
    }
}



function chatbot(){
    var targetusername = document.getElementById("root").innerText.split('\n')[0];
    var hasNumber = /\d/;
    if (window.location.href.indexOf('/messages')!=-1){
        getallmessage(function(){
            // console.log(mychatrecord)
            var tempquestion, tempanswer, temppos;
            console.log(mychatrecord)
            for (var j=mychatrecord.length-1; j>=0; j--){
                // console.log(mychatrecord[j].name,targetusername)
                // tempanswer = undefined
                if (mychatrecord[j].name==targetusername){
                    if ((!tempquestion)&&(!tempanswer)){
                        for (var k=0; k<mychatrecord[j].data.length; k++){
                            if (hasNumber.test(mychatrecord[j].data[k])){
                                 tempanswer = mychatrecord[j].data[k].match(/\d+/g)[0]
                                 console.log(tempanswer)
                                 break;
                            }
                         }
                    }
                } else {
                    // tempanswer = undefined;
                    if (!tempquestion){
                        for (var k=0; k<mychatrecord[j].data.length; k++){
                            findtreeans = undefined
                            var temptreeresult = findtree(treedata[0],mychatrecord[j].data[k]);
                            temptreeresult = findtreeans
                            if (temptreeresult){
                                tempquestion = temptreeresult.q
                                temppos = temptreeresult
                                console.log(tempquestion)
                                break;
                            }
                        }
                    }
                   
                    
                }
                if (tempquestion&&tempanswer) break;
            }
            console.log(tempquestion,tempanswer)
            if (!tempquestion){
                console.log(treedata[0])
                var tempreply = treedata[0].q
                sendmessage(tempreply)
                tempreply = ''
                for (var j=0; j<treedata[0].c.length; j++){
                    tempreply+=''+(j+1)+'. '+treedata[0].c[j].a+'\n'
                }
                sendmessage(tempreply)
                
            } else if (tempquestion&&tempanswer){
                tempanswer = tempanswer-1
                console.log(temppos,tempanswer)
                if (temppos.c[tempanswer].c){
                    var tempreply = temppos.c[tempanswer].q
                    sendmessage(tempreply)
                    tempreply =''
                
                    for (var j=0; j<temppos.c[tempanswer].c.length; j++){
                        console.log(temppos.c[tempanswer].c[j])
                        tempreply+=''+(j+1)+'. '+temppos.c[tempanswer].c[j].a+'\n'
                    }
                    sendmessage(tempreply)
                }
                 
               
            }


        })
    }
}



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
                    console.log(mymessagelist[j].innerText)
                    var tempname = mymessagelist[j].innerText.split("\n")[0];
					frdlistjson[tempname] = {};
                    frdlistjson[tempname].dom = mymessagelist[j];
                    frdlistjson[tempname].a = mymessagelist[j].getElementsByTagName('a')[0].href;
					frdlistjson[tempname].time = mymessagelist[j].innerText.split("\n")[2];
					frdlistjson[tempname].index = j;
				}
				console.log(frdlistjson);
			}
			
		} 
	}, 500);
}



var resultreturn = '';
function monpost(){
    resultreturn = '';
    if (window.location.href.indexOf('/reaction')!=-1){
        console.log('run reaction code')
        var mywaitfunc = setInterval(function(){
    
            if (document.getElementsByClassName('content')[0]){
                document.getElementsByClassName('content')[0].click()
            } else {
                clearInterval(mywaitfunc)
                var allreactpeople = document.getElementsByClassName('_4mn c');
                var tempmessagelist = [];
                // var tempmessagelist = messagelist
                for (var j=0; j<allreactpeople.length; j++){
                    console.log(allreactpeople[j].getElementsByTagName('a')[0].href)
                    tempmessagelist.push(allreactpeople[j].getElementsByTagName('a')[0].href)
                    resultreturn += allreactpeople[j].getElementsByTagName('a')[0].href+'<br>'
                }
                sendresult(resultreturn);
                savemessagelist(tempmessagelist)
            }
        }, 500);
    } else if (window.location.href.indexOf('/home')!=-1){
        console.log('run home code')
        setTimeout(() => {
            window.scrollTo(0,document.body.scrollHeight);
            setTimeout(() => {
                window.scrollTo(0,document.body.scrollHeight);
                setTimeout(() => {
                    window.scrollTo(0,document.body.scrollHeight);
                    setTimeout(() => {
                        var allarticle = document.getElementsByTagName('article')
                        for (var j=0; j<allarticle.length; j++){
                            if (document.getElementsByTagName('article')[j].getElementsByTagName(
                                'footer')[0]){
                                    var tempposttext = document.getElementsByTagName('article')[j].innerText
                                    var tempdiv = document.getElementsByTagName('article')[j].getElementsByTagName('footer')[0].getElementsByTagName('div')[0]
                                    if (tempdiv){
                                        var temphref = 'https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier='+tempdiv.id.replace('feedback_inline_','');
                                        console.log(j)
                                        console.log(tempposttext)
                                        console.log(temphref)
                                            resultreturn += '<div class="prediv"><pre>'+tempposttext+'</pre><a hidden  href="'+temphref+'">link</a></div><hr>'
                                    }
                                    
                                }
                        }
                        sendresult(resultreturn);
                    }, 500);
                }, 500);
            }, 500);
        }, 500);
       
    } else if (window.location.href.indexOf('/messages')!=-1){
        // console.log('run messages code')
        // resultreturn='sending message'
        // // sendmessage('hi')
        // sendmessage(messagebody)
        // sendresult(resultreturn);
        // setmessagedone();
    } else if (window.location.href.indexOf('?fref=pb')!=-1){
        console.log('run profile code')
        // resultreturn='sending message to<br>'
        resultreturn='adding messagelist<br>'
        var allprofilebutton = document.getElementsByTagName('a');
        for (var j=0; j<allprofilebutton.length; j++){
            if (allprofilebutton[j].href){
                if (allprofilebutton[j].href.indexOf("messages/thread")!=-1){
                    console.log(allprofilebutton[j].href)
                    resultreturn+='<a href="'+allprofilebutton[j].href+'">'+allprofilebutton[j].href+'</a>'
                    if ( chatbotmessagelist[allprofilebutton[j].href]){
                        chatbotmessagelist[allprofilebutton[j].href].ct++
                    } else {
                        chatbotmessagelist[allprofilebutton[j].href] = {
                            ct: 1,
                            name: document.getElementsByTagName('h3')[0].innerText,
                            chatbotuse: 0
                        }
                    }
                    
                    setchatbotmessagelist(chatbotmessagelist)
                    // sendnowmessagelink(allprofilebutton[j].href)
                }
            }
        }
        sendresult(resultreturn);
        setmessagedone();
    }
   
}


function sendmessage(mymessage){
	document.getElementsByTagName('textarea')[0].value = mymessage
	var testkey = new KeyboardEvent("keydown", {
	    bubbles: true, cancelable: true, keyCode: 13
	});
    document.getElementsByTagName('textarea')[0].dispatchEvent(testkey);
    for (var j=0; j<document.getElementsByTagName('button').length; j++){
        // if (document.getElementsByTagName('button')[j].getAttribute("data-sigil")=='send'){
        if (document.getElementsByTagName('button')[j].name=='send'||document.getElementsByTagName('button')[j].getAttribute("data-sigil")=='send'||document.getElementsByTagName('button')[j].name=='Send'){
            document.getElementsByTagName('button')[j].click()
        }
    }
	// document.getElementsByTagName("button")[2].click()
}

function sendresult(resultreturn){
    console.log(resultreturn)
    chrome.storage.sync.set({'resultreturn': resultreturn}, function() {
        // Notify that we saved.
        console.log('send result done');
    });
}

function setchatbotmessagelist(x){
    chrome.storage.sync.set({'chatbotmessagelist': x}, function() {
        // Notify that we saved.
        // alert('ok')
        console.log('send result done');
    });
}


function savemessagelist(messagelist){
    chrome.storage.sync.set({'messagelist': messagelist}, function() {
        // Notify that we saved.
        console.log('save messagelist done');
    });
}

function sendnowmessagelink(messagelink){
    chrome.storage.sync.set({'messagelink': messagelink}, function() {
        // Notify that we saved.
        console.log('save messagelink done');
    });
    
}

function setmessagedone(){
    chrome.storage.sync.set({'messagedone': 'done'}, function() {
        // Notify that we saved.
        console.log('set messagedone done');
    });
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

if (!expandtimes_message)
var expandtimes_message = 5;
var mychatlist = document.getElementsByClassName("voice acw");
if (!mychatrecord)
var mychatrecord = [];

function getallmessage(callback){
	if (document.getElementsByTagName('strong')[0])
    document.getElementsByTagName('strong')[0].click()
	var mywaitfunc = setTimeout(function(){
		if (expandtimes_message>0&&document.getElementsByTagName('strong')[0]){
			expandtimes_message--;
			getallmessage(callback);
		} else {
            if (mychatlist){
                for (var j=0; j<mychatlist.length; j++){
                    // console.log(mychatlist[j])
                    var tempchatlist = mychatlist[j].getElementsByClassName("_1c-b _34ee _3_5q _34eo");
                    // console.log(tempchatlist)
                    var tempchatrecord = {};
                    if (IsJsonString(mychatlist[j].dataset.store)){
                        tempchatrecord.name = JSON.parse(mychatlist[j].dataset.store).name
                        console.log(tempchatrecord.name)
                        tempchatrecord.data = [];
                        for (var k=0; k<tempchatlist.length; k++){
                            if (tempchatlist[k]){
                                tempchatrecord.data.push(tempchatlist[k].innerText);
                            }
                        }
                        mychatrecord.push(tempchatrecord)
                    }
                
                }
                // console.log(mychatrecord)
    
                
                callback()
            } else {
                callback()
            }

		}
	}, 500);
	
}

