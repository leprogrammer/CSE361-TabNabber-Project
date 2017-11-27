window.onfocus = function(){
   chrome.extension.sendMessage({name: 'currScreenshot'}, function(response) {
     if(response.currURL in response.imageDic){
       var diff = resemble(response.newscreenshot).compareTo(response.imageDic[response.currURL]).ignoreColors().onComplete(function (data){
         console.log(data);
       });
     }else{
       console.log("no image taken yet")
     }
   });
}
