var treedata,mychatbot;//,oldtreedata;
var nowroute,nowpos;
var oldtreedata;

chrome.storage.sync.get(['chatbot','treedata'], function(result) {
  console.log(result)
  treedata = result.treedata;
  mychatbot = result.chatbot;
  oldtreedata = JSON.stringify(result.treedata);
  startpage()
});

function startpage(){
  gentree(treedata[0])
  genedittree(treedata[0])
  if (mychatbot=='on'){
    document.getElementById('startchatbotbutton').hidden = true;
    document.getElementById('stopchatbotbutton').hidden = false;
  } else {
    document.getElementById('startchatbotbutton').hidden = false;
    document.getElementById('stopchatbotbutton').hidden = true;
  }
}

document.getElementById('startchatbotbutton').onclick = function(){
  setchatbotstatus('on')
  mychatbot = 'on'
  startpage()
  chrome.runtime.sendMessage({data: "checkbackground"})
}
document.getElementById('stopchatbotbutton').onclick = function(){
  setchatbotstatus('off')
  mychatbot = 'off'
  startpage()
  chrome.runtime.sendMessage({data: "checkbackground"})
}


function setchatbotstatus(x){
  chrome.storage.sync.set({'chatbot': x}, function() {
      // Notify that we saved.
      console.log('set chatbot done');
  });
}



// savetreedata(treedata)
    // var treedata = [
    //     {
    //       q:"您有冇食開魚油？",
    //       c:[{
    //             a:"有",
    //             q:"點解您會食魚油？",
    //             c:[{
    //               a:"處理心血管問題",
    //             },
    //             {
    //               a:"減少身體炎症",
    //             },
    //             {
    //               a:"促進腦部功能",
    //             },{
    //               a:"改善關節功能及活動性",
    //             }]
    //           },
    //           {
    //             a:"冇",
    //             q:"有冇興趣試下Nuskin的魚油？"
    //           }]
    //     }
    //   ]
  
        function divetree(data,ans){
          // if (data.c)
          //   ans+="<li onclick='addtree(this)'>"
          // else
            ans+="<li>"
          
          if (data.a){
            if (data.q)
              ans+= "<a>"+data.a+': '+data.q+"</a>"
            else
              ans+= "<a>"+data.a+"</a>"
          }
          else
            ans+= "<a>"+data.q+"</a>"
          if (data.c){
            ans+='<ul>'
            for (var j=0; j<data.c.length; j++){
              // ans+='<li>'
              ans = divetree(data.c[j],ans)
              // ans+='</li>'
            }
            ans+='</ul>'
          }
            
          ans+="</li>"
          return ans
        }
  
  
        function gentree(data){
          var ans = "<ul class='tree'>"
          ans = divetree(data,ans)
  
            
          ans+="</ul>"
          // console.log(ans)
          document.getElementById("treediagram").innerHTML = ans
        }


        

        function savetreedata(treedata){
          chrome.storage.sync.set({'treedata': treedata}, function() {
              // Notify that we saved.
              console.log('save treedata done');
          });
        }
  
  
        var canaddtree = 1;
        function addtree(x){
          if (canaddtree==0) return;
          canaddtree = 0;
          // console.log(x)
  
          var temptag = x
          var treelist = [];
          while (temptag.tagName!="DIV"){
            // console.log(temptag.tagName)
            if (temptag.tagName=="LI"){
              if (temptag.getElementsByTagName('a')[0].innerText.indexOf(':')==-1){
                var tempq = temptag.getElementsByTagName('a')[0].innerText.trim()
                var tempa = undefined
              } else {
                var tempq = temptag.getElementsByTagName('a')[0].innerText.split(':')[1].trim()
                var tempa = temptag.getElementsByTagName('a')[0].innerText.split(':')[0].trim()
              }
              
              
              treelist.push({q:tempq,a:tempa})
            }
            temptag = temptag.parentElement
          }
  
          var temppos = treedata;
          var temproute = [];
          for (var j=treelist.length-1; j>=0; j--){
            // console.log(treelist[j])
            // console.log(temppos)
            for (var k=0; k<temppos.length; k++){
              if (temppos[k].q == treelist[j].q||(!treelist[j].a)&&temppos[k].a == treelist[j].q){
                temproute.push(k)
                if (temppos[k].c)
                  temppos = temppos[k].c
                else
                  temppos = temppos[k]
                break
              }
            }
          }
  
  
          nowpos = temppos
          nowroute = temproute;
          openForm()
        }
  
  
  
        function openForm() {
          document.getElementById("popupForm").style.display = "block";
          if (Array.isArray(nowpos)){
            // var tempq = nowpos.q;
            var tempc = nowpos;
            // console.log(tempq)
            console.log(tempc)
          } else {
  
          }
        }
        function closeForm() {
          document.getElementById("popupForm").style.display = "none";
          clearform()
          canaddtree = 1;
        }
  
        function formaddchoice(x){
          document.getElementById('formchoicearea').innerHTML+='<input type="text" placeholder="" >'
        }
  
        function doneform(){
          var allchoice = document.getElementById('formchoicearea').getElementsByTagName('input')
          var question = document.getElementById('formquestion').value
          if (nowpos.c){
            
           
          } else {
            nowpos.c = []
  
            for (var j=0; j<allchoice.length; j++){
              if (allchoice[j].value)
              nowpos.c.push({a:allchoice[j].value})
            }
  
            nowpos.q = question
          }
          
         
          gentree(treedata[0])
          closeForm()
          
        }
  
        function clearform(){
          document.getElementById("formquestion").value = ''
          document.getElementById("formchoicearea").innerHTML = ' <input type="text" placeholder="" >'
        }

        document.getElementById('edittreebutton').onclick = function(){
          genedittree(treedata[0])
          document.getElementById('treediagram').hidden = true;
          document.getElementById('edittreediagram').hidden = false;
          
        }

        document.getElementById('previewtreebutton').onclick = function(){
          gentree(treedata[0])
          document.getElementById('treediagram').hidden = false;
          document.getElementById('edittreediagram').hidden = true;
        }


        function setuptreeinput(){
          var alledittreeinput = document.getElementById('edittreediagram').getElementsByTagName('input');
          for (var j=0; j<alledittreeinput.length; j++){
            alledittreeinput[j].onchange = function(){
              console.log(this.value, this.name, this.classList[0])
              var tempnowpos = treedata[0];
              var layerid = this.name.split('-');
              if (layerid.length>1){
                for (var k=1; k<layerid.length; k++){
                  tempnowpos=tempnowpos.c[layerid[k]]
                }
              }
              // console.log(tempnowpos)  
              if (this.classList[0].indexOf('edittreea')!=0){
                tempnowpos.q = this.value;
              } else if (this.classList[0].indexOf('edittreeq')!=0){
                tempnowpos.a = this.value;
              }         



            }
            
          }

          var alledittreebutton = document.getElementById('edittreediagram').getElementsByTagName('div');
          for (var j=0; j<alledittreebutton.length; j++){
            alledittreebutton[j].onclick = function(){
              if (this.innerText=='+'){
                var tempnowpos = treedata[0];
                var layerid = this.classList[0].split('-');
                if (layerid.length>1){
                  for (var k=1; k<layerid.length; k++){
                    tempnowpos=tempnowpos.c[layerid[k]]
                  }
                }
                console.log(tempnowpos)
                if (!tempnowpos.q){
                  tempnowpos.q = "input reaction"
                }
                if (!tempnowpos.c){
                  tempnowpos.c = [{a: "input choice"}]
                } else {
                  tempnowpos.c.push({a: "input choice"})
                }
                genedittree(treedata[0])
              } else if (this.innerText=='-'){
                var tempnowpos = treedata[0];
                var layerid = this.classList[0].split('-');
                if (layerid.length>1){
                  for (var k=1; k<layerid.length-1; k++){
                    tempnowpos=tempnowpos.c[layerid[k]]
                  }
                }
         
                console.log(tempnowpos, layerid[layerid.length-1])
                delete tempnowpos.c[layerid[layerid.length-1]]
                tempnowpos.c = tempnowpos.c.filter(function (e) {return e != null;});
                genedittree(treedata[0])
              }
            }
          }
        }
   

        document.getElementById("canceltreebutton").onclick = function(){
          if (confirm('Are you sure to clear this?')){
            resettreedata()
          }
        }

        document.getElementById("savetreebutton").onclick = function(){
          if (confirm('Are you sure to save this?')){
            savetreedata(treedata)
            // oldtreedata = treedata;
            oldtreedata = JSON.stringify(treedata);
          }
        }

        function diveedittree(data,ans,pos){
          // if (data.c)
          //   ans+="<li onclick='addtree(this)'>"
          // else
        
            ans+="<li>"
           
          if (data.a){
            if (data.q){
              ans+= "<a><input name='"+pos+"' class='edittreea' value='"+data.a+"'>: <input class='edittreeq' name='"+pos+"' value='"+data.q+"'></a>"
              + "<div style='margin-left: 10px; display: inline-block' class='"+pos+"' >+</div>"
              + "<div style='margin-left: 10px; display: inline-block' class='"+pos+"' >-</div>"
            }
            else {
              ans+= "<a><input name='"+pos+"' class='edittreea' value='"+data.a+"'></a>"
              + "<div  style='margin-left: 10px; display: inline-block' class='"+pos+"'>+</div>"
              + "<div  style='margin-left: 10px; display: inline-block' class='"+pos+"'>-</div>"
            }
              
          }
          else{
            ans+= "<a><input name='"+pos+"' class='edittreeq' value='"+data.q+"'></a>"
            + "<div  style='margin-left: 10px; display: inline-block' class='"+pos+"'>+</div>"
              + "<div  style='margin-left: 10px; display: inline-block' class='"+pos+"'>-</div>"
          }
            

          
          if (data.c){
            ans+='<ul>'
            for (var j=0; j<data.c.length; j++){
              // ans+='<li>'
              ans = diveedittree(data.c[j],ans,pos+'-'+j)
              // ans+='</li>'
            }
            ans+='</ul>'
          }
            
          ans+="</li>"
          return ans
        }
  
  
        function genedittree(data){
          // var ans = "<ul class='tree'>"
          var ans = "<ul>"
          ans = diveedittree(data,ans,'edittreelayer')
  
            
          ans+="</ul>"
          // console.log(ans)
          document.getElementById("edittreediagram").innerHTML = ans
          setuptreeinput()
        }

        function resettreedata(){
          treedata = JSON.parse(oldtreedata)
          gentree(treedata[0])
          genedittree(treedata[0])
        }