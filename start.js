
document.getElementById("monpostbutton").onclick = function(){
    if (this.innerHTML!='Done'){
        startpostmon()
        this.innerHTML = 'Done'
    } else {
        stoppostmon()
        this.innerHTML = 'Start Post Monitor'
    }
    // setchromevalue('action','chatbot')
    chrome.runtime.sendMessage({data: "checkbackground"})
}

document.getElementById("sendmessagebutton").onclick = function(){
    startsendmessage()
}


function startpostmon(){
    setchromevalue('action','monpost')
    window.open("https://m.facebook.com/home.php", "", "width=200,height=100")
 }

 function stoppostmon(){
    setchromevalue('action','')
    clearresult()
    document.getElementById("sendmessagearea").hidden = true;
 }

 function setchromevalue(key, value){
     var tempobj = {};
     tempobj[key] = value
     chrome.storage.sync.set(tempobj, function() {
         console.log(key+' is set to ' + value)
     });
 }

 function getresultreturn(){
    chrome.storage.sync.get(['resultreturn'], function(result) {
        if (result.resultreturn){
            console.log(result.resultreturn)
            document.getElementById('showdataarea').innerHTML = result.resultreturn;
            pretagaction()
        }
    });
 }

 
 function getactionstatus(){
    chrome.storage.sync.get(['action'], function(result) {
        console.log('action status currently is ' + result.action);
        document.getElementById("monpostbutton").innerHTML = 'Start Chat Bot'
        if (result.action=='monpost'){
            document.getElementById("monpostbutton").innerHTML = 'Done'
        }
    });
 }

 var nowmessagelist;

 function getmessagelist(){
    chrome.storage.sync.get(['messagelist'], function(result) {
        console.log('messagelist currently is ' + result.messagelist);
        if (result.messagelist){
            nowmessagelist = result.messagelist;
            document.getElementById("sendmessagearea").hidden = false;
        }
    });
 }

 function getmessagelink(){
    chrome.storage.sync.get(['messagelink'], function(result) {
        console.log('messagelink currently is ' + result.messagelink);
        if (result.messagelink){
            window.open(result.messagelink, "", "width=200,height=100")
            chrome.storage.sync.set({'messagelink': ''}, function() {
                // Notify that we saved.
                console.log('done');
            });
        }
    });
 }

 
 function getmessagedone(){
    chrome.storage.sync.get(['messagedone'], function(result) {
        console.log('messagelist currently is ' + result.messagedone);
        messagedone = result.messagedone;
        
    });
 }

function showmessageprogress(x){
    document.getElementById('showprogressarea').innerHTML = '';
    for (var j=0; j<nowmessagelist.length; j++){
        
        if (j==x){
            document.getElementById('showprogressarea').innerHTML += '<div>* '+nowmessagelist[j]+'</div>';
        } else {
            document.getElementById('showprogressarea').innerHTML += '<div>'+nowmessagelist[j]+'</div>';
        }
        document.getElementById('showprogressarea').innerHTML += '<hr>';
    }
}


var messagedone = '';
var nowmessagewindow;
var nowinterval;
 function startsendmessage(){
     if (nowmessagelist){
        // alert(result.messagelist)
        // window.open(nowmessagelist[0], "", "width=200,height=100")
        // for (var j=0; j<result.messagelist.length; j++){
        //     window.open(result.messagelist[j], "", "width=200,height=100")
        // }
        chrome.storage.sync.set({'messagedone': ''}, function() {
            // Notify that we saved.
            console.log('done');
        });

        var messagebody = document.getElementById('messagebody').value;
        chrome.storage.sync.set({'messagebody': messagebody }, function() {
            // Notify that we saved.
            console.log('done');
        });
      
      
     }
       
 }


 

function pretagaction(){
    var allpre = document.getElementsByClassName('prediv');
    if (allpre.length>0){
        for (var j=0; j<allpre.length; j++){
            allpre[j].onclick = function(){
                console.log(this)
                window.open(this.getElementsByTagName('a')[0].href, "", "width=200,height=100")
            }
        }
    }

}

function clearresult(){
    chrome.storage.sync.set({'resultreturn': ''}, function() {
        // Notify that we saved.
        console.log('done');
    });
    chrome.storage.sync.set({'messagelist': ''}, function() {
        // Notify that we saved.
        console.log('done');
    });
    chrome.storage.sync.set({'messagelink': ''}, function() {
        // Notify that we saved.
        console.log('done');
    });
    chrome.storage.sync.set({'messagedone': ''}, function() {
        // Notify that we saved.
        console.log('done');
    });

    document.getElementById('showdataarea').innerHTML = ''
}

function getnowwindow(){
    chrome.storage.local.get(['nowwindow'], function(result) {
        console.log('nowwindow currently is ' + result.nowwindow);
        
    });
}




 chrome.storage.onChanged.addListener(function(){
    getresultreturn()
    getactionstatus()
    getnowwindow()
    getmessagelist()
    getmessagelink()
    getmessagedone()
 })

//  setInterval(() => {
//     getresultreturn()
//     getactionstatus()
//  }, 500);

 getresultreturn()
 getactionstatus()
 getnowwindow()
 getmessagelist()
 getmessagelink()
 getmessagedone()