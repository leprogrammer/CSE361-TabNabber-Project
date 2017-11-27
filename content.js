var focus = true;
window.onfocus = function(){
  if(!focus){
   chrome.extension.sendMessage({name: 'currScreenshot'}, function(response) {
     var diff = resemble(response.imageDic['http://www.example.com/']).compareTo(response.imageDic['http://www.example.com/']).ignoreColors().onComplete(function (data){
       console.log(data);
     });
   });


  }
  focus = true;
}

window.onblur = function() {
    focus = false;
};
