var treedata,messagelist;


chrome.storage.sync.get(['treedata','chatbotmessagelist'], function(result) {
  console.log(result)
  treedata = result.treedata;
  if (result.chatbotmessagelist){
      messagelist = result.chatbotmessagelist
      var mydata = [];
      for (var j in messagelist){
          mydata.push([messagelist[j].name,'<select name="'+j+'"><option value="-1">-1</option><option value="0">0</option></select>',messagelist[j].ct,'<input>',j])
      }
      console.log(mydata)
      document.getElementById('dataTable').innerHTML = ''
        $('#dataTable').DataTable( {
            data: mydata,
            columns: [
                { title: "Name" },
                { title: "Use ChatBot" },
                { title: "Times of Reaction" },
                { title: "Sales Process" },
                { title: "Facebook Link" }
            ]
        } );
      setselectlist()
  }

});


function setselectlist(){
    var allselect = document.getElementsByTagName('select')
    for (var j=1; j<allselect.length; j++){
     //    console.log(allselect[j].name)
         allselect[j].value = messagelist[allselect[j].name].chatbotuse
      allselect[j].onchange= function(){
         //  console.log(this.name, this.value)
         changechatbotuse(this.value,this.name)
      }
    }
}

document.getElementById('clearbutton').onclick = function(){
    setchatbotmessagelist({})
}

var allpagelink = document.getElementsByClassName("page-link")
for (var j=0; j<allpagelink.length; j++){
    allpagelink.onclick= function(){
    
    }
}

setInterval(function(){
    setselectlist()
},500)



function setchatbotmessagelist(x){
    chrome.storage.sync.set({'chatbotmessagelist': x}, function() {
        // Notify that we saved.
        // alert('ok')
        console.log('send result done');
        // alert("ok")
    });
}


function changechatbotuse(x,y){
    messagelist[y].chatbotuse = parseInt(x)
    setchatbotmessagelist(messagelist)
}
