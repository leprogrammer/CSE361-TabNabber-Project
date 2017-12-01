window.onfocus = function(){
   chrome.extension.sendMessage({name: 'currScreenshot'}, function(response) {
     if(response.currURL in response.imageDic){
       var diff = resemble(response.newscreenshot).compareTo(response.imageDic[response.currURL]).ignoreLess().scaleToSameSize().onComplete(function (data){
         console.log(data);
         var canvasAlreadyInserted = document.getElementById("1337Overlay");
         if(data.misMatchPercentage > 0){
           if(canvasAlreadyInserted != null){
             document.body.removeChild(canvasAlreadyInserted)
           }
           var canvasElement = document.createElement("canvas");
           canvasElement.id = "1337Overlay";
           canvasElement.style.display = "block";
           canvasElement.style.position = "fixed";
           canvasElement.style.height = "100%";
           canvasElement.style.width = "100%";
           canvasElement.width = window.innerWidth*window.devicePixelRatio;
           canvasElement.height = window.innerHeight*window.devicePixelRatio;
           canvasElement.style.top = "0";
           canvasElement.style.left = "0";
           canvasElement.style.zIndex = "9001";

           var context = canvasElement.getContext("2d");

           var differenceImage = new Image();
           differenceImage.onload = function(){
             context.clearRect(0, 0, canvasElement.width, canvasElement.height);
             context.drawImage(differenceImage, 0, 0);
           };
           differenceImage.src = data.getImageDataUrl();
           //divElement.innerHTML = differenceImage;
           document.body.appendChild(canvasElement);
           canvasElement.onclick = function(){
             document.getElementById("1337Overlay").style.display = "none";
           };
        }
        chrome.extension.sendMessage({mismatch: data.misMatchPercentage}, function(response){});
       });
     }else{
       console.log("no image taken yet")
     }
   });
}
