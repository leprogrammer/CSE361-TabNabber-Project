window.onfocus = function(){
   chrome.extension.sendMessage({name: 'currScreenshot'}, function(response) {
     if(response.currURL in response.imageDic){
       var diff = resemble(response.newscreenshot).compareTo(response.imageDic[response.currURL]).ignoreColors().onComplete(function (data){
         console.log(data);
         var divElement = document.createElement("div");
         divElement.id = "1337Overlay";
         divElement.style.display = "block";
         divElement.style.position = "fixed";
         divElement.style.height = "100%";
         divElement.style.width = "100%";
         divElement.style.top = "0";
         divElement.style.left = "0";
         divElement.style.right = "0";
         divElement.style.bottom = "0";
         divElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
         divElement.style.zIndex = "2";
         divElement.onclick = function(){
           document.getElementById("1337Overlay").style.display = "none";
         };

         var differenceImage = new Image();
         differenceImage.src = data.getImageDataUrl();
         //divElement.innerHTML = differenceImage;
         document.body.appendChild(divElement);
       });
     }else{
       console.log("no image taken yet")
     }
   });
}
