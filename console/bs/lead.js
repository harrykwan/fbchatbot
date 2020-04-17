var treedata,mychatbot;//,oldtreedata;
var nowroute,nowpos,nowmessagelist;
var oldtreedata;

chrome.storage.sync.get(['chatbot','treedata'], function(result) {
  console.log(result)
  treedata = result.treedata;
  mychatbot = result.chatbot;
  oldtreedata = JSON.stringify(result.treedata);
  startpage()
});

function startpage(){
  getresultreturn()
  getactionstatus()
  getmessagelist()
  // getmessagelink()
  getmessagedone()
  chrome.storage.onChanged.addListener(function(){
      getresultreturn()
      getactionstatus()
      getmessagelist()
      // getmessagelink()
      getmessagedone()
   })
}

// document.getElementById('startleadgenbutton').onclick = function(){
//   setchromevalue('action','monpost')
//   chrome.runtime.sendMessage({data: "checkbackground"})
// }

document.getElementById("sendmessagebutton").onclick = function(){
  startgetmessagelist()
  // startsendmessage()
}


var myallwindow = []
function startgetmessagelist(){
  showmessageprogress()
  var myallprofilelink = document.getElementById('showdataarea').innerText.split('\n')
  for (var j=0; j<myallprofilelink.length; j++){
    gotopage(myallprofilelink[j],j)
    deletepage(j)
  }
}

function gotopage(x,index){
  setTimeout(function(){
    myallwindow[index] = window.open(x, "", "width=200,height=100")
    
  },2000*index)
}

function deletepage(index,page){
  setTimeout(() => {
    page.close()
    // showmessageprogress(document.getElementById('showdataarea').innerText.split('\n')[1])
  }, 2000*index+5000);
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

var setmessagelinkwindow
function getmessagelink(){
 chrome.storage.sync.get(['messagelink'], function(result) {
     console.log('messagelink currently is ' + result.messagelink);
     if (result.messagelink){
         setmessagelinkwindow = window.open(result.messagelink, "", "width=200,height=100")
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
     for (var j=0;nowmessagelist.length; j++){
         window.open(nowmessagelist[j], "", "width=200,height=100")
     }
     chrome.storage.sync.set({'messagedone': ''}, function() {
         // Notify that we saved.
         console.log('done');
     });

   
   
  }
    
}



var pretagactionwindow;
function pretagaction(){
 var allpre = document.getElementsByClassName('prediv');
 if (allpre.length>0){
     for (var j=0; j<allpre.length; j++){
         allpre[j].onclick = function(){
             console.log(this)
             pretagactionwindow = window.open(this.getElementsByTagName('a')[0].href, "", "width=200,height=100")
             window.setTimeout(function(){
               if (pretagactionwindow){
                 pretagactionwindow.close()
               }
             },5000)
         }
     }
 }

}

function getactionstatus(){
  chrome.storage.sync.get(['action'], function(result) {
      console.log('action status currently is ' + result.action);
      document.getElementById("startleadgenbutton").innerHTML = 'Start Post Monitor'
      if (result.action=='monpost'){
          document.getElementById("startleadgenbutton").innerHTML = 'Done'
      }
  });
}


function startpostmon(){
  setchromevalue('action','monpost')
  var tempwindow = window.open("https://m.facebook.com/home.php", "", "width=200,height=100")
  setTimeout(function(){
    tempwindow.close()
  },5000)
}

function stoppostmon(){
  setchromevalue('action','')
  clearresult()
  document.getElementById("sendmessagearea").hidden = true;
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


document.getElementById("startleadgenbutton").onclick = function(){
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