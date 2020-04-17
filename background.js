
var mychecktimer,messagelist;
alert('Welcome! Let\'s set up your account');

chrome.storage.sync.get(['treedata','chatbotmessagelist'], function(result) {
    console.log(result)
    if ((!result.treedata)){
        
          var treedata = [
        {
          q:"Start You Conversation"
        }
      ]
        chrome.storage.sync.set({'treedata': treedata}, function() {
            // Notify that we saved.
            console.log('set treedata done');
        });
    }
});

chrome.runtime.onMessage.addListener(function(message, callback) {
    if (message.data == "checkbackground") {
        chrome.storage.sync.get(['action','chatbot','chatbotmessagelist'], function(result) {
            console.log(result)
            messagelist = result.chatbotmessagelist
            // if (result.action=='monpost'){
            //     // alert('starting monpost')
            //     monpost()
            // } else {

            // }
            if (result.chatbot=='on'){
                alert('starting chat bot')
                chatbot()
            } else {
                if (mychecktimer){
                    clearallwindow()
                    clearInterval(mychecktimer)
                    
                }
            }
        });
    }
    
       
  });


function monpost(){
    window.open("https://m.facebook.com/home.php", "", "width=200,height=100")

}


// messagelist = ['https://m.facebook.com/messages/thread/100044332189746/?entrypoint=profile_message_button&refid=17&__xts__%5B0%5D=48.%7B%22event%22%3A%22message%22%2C%22intent_status%22%3Anull%2C%22intent_type%22%3Anull%2C%22profile_id%22%3A100044332189746%2C%22ref%22%3A3%7D']
windowlist = []
var windowlength = 0
function chatbot(){
    var tempmessagelist = []
    windowlength = 0;
    for (var j in messagelist){
        if (messagelist[j].chatbotuse>-1){
            tempmessagelist.push(j)
            windowlength++
        }
    }
    // console.log(tempmessagelist)
    mychecktimer = setInterval(function(){
       console.log('starting again')
       for (var j=0; j<tempmessagelist.length; j++){
           
           openmessagelist(tempmessagelist,j)
       }
    },(tempmessagelist.length*1000+1000))
}

function openmessagelist(tempmessagelist, x){
    console.log(tempmessagelist[x],x)
    setTimeout(function(){
        // console.log(tempmessagelist[x],x)
        // if (windowlist[x])
        //     windowlist[x].close()

        windowlist[x] = window.open(tempmessagelist[x], "", "width=200,height=100")
        closemessagelist(x,windowlist[x])
    },1000*x)
}

function closemessagelist(x,y){
    setTimeout(function(){
        y.close()
    },1000*x+5000)
}


function clearallwindow(){
 for (var j=0; j<windowlength; j++){
     if (windowlist[j]){
         windowlist[j].close()
     }
 }
}