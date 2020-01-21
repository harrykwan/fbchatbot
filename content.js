// console.log(window.location.href)
var messagebody
chrome.storage.sync.get(['action','messagebody'], function(result) {
    console.log(result)
    messagebody = result.messagebody
    if (result.action=='monpost'){
        monpost()
    }
});



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
        var allarticle = document.getElementsByTagName('article')
        for (var j=0; j<allarticle.length; j++){
            if (document.getElementsByTagName('article')[j].getElementsByTagName(
                'footer')[0]){
                    var tempposttext = document.getElementsByTagName('article')[j].innerText
                    var temphref = 'https://m.facebook.com/ufi/reaction/profile/browser/?ft_ent_identifier='+document.getElementsByTagName('article')[j].getElementsByTagName(
                        'footer')[0].getElementsByTagName('div')[0].id.replace('feedback_inline_','');
                    console.log(j)
                    console.log(tempposttext)
                    console.log(temphref)
                        resultreturn += '<div class="prediv"><pre>'+tempposttext+'</pre><a hidden  href="'+temphref+'">link</a></div><hr>'
                }
        }
        sendresult(resultreturn);
    } else if (window.location.href.indexOf('/messages')!=-1){
        console.log('run messages code')
        resultreturn='sending message'
        // sendmessage('hi')
        sendmessage(messagebody)
        sendresult(resultreturn);
        setmessagedone();
    } else if (window.location.href.indexOf('?fref=pb')!=-1){
        console.log('run profile code')
        resultreturn='sending message to<br>'
        var allprofilebutton = document.getElementsByTagName('a');
        for (var j=0; j<allprofilebutton.length; j++){
            if (allprofilebutton[j].href){
                if (allprofilebutton[j].href.indexOf("messages/thread")!=-1){
                    console.log(allprofilebutton[j].href)
                    resultreturn+='<a href="'+allprofilebutton[j].href+'">'+allprofilebutton[j].href+'</a>'
                    sendnowmessagelink(allprofilebutton[j].href)
                }
            }
        }
        sendresult(resultreturn);
    }
   
}


function sendmessage(mymessage){
	document.getElementsByTagName('textarea')[0].value = mymessage
	var testkey = new KeyboardEvent("keydown", {
	    bubbles: true, cancelable: true, keyCode: 13
	});
	document.getElementsByTagName('textarea')[0].dispatchEvent(testkey);
	document.getElementsByTagName("button")[0].click()
}

function sendresult(resultreturn){
    console.log(resultreturn)
    chrome.storage.sync.set({'resultreturn': resultreturn}, function() {
        // Notify that we saved.
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

