window.onfocus = function(){
   chrome.extension.sendMessage({name: 'currScreenshot'}, function(response) {
     if(response.currURL in response.imageDic){
       var diff = resemble(response.newscreenshot).compareTo(response.imageDic[response.currURL]).ignoreLess().scaleToSameSize().onComplete(function (data){
         console.log(data);
         /*var divElement = document.createElement("div");
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
         };*/
         var canvasAlreadyInserted = document.getElementById("1337Overlay");
         if(data.misMatchPercentage > 0 && canvasAlreadyInserted == null){
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
           //canvasElement.onclick = function(){
             //document.getElementById("1337Overlay").style.display = "none";
           //};
           var context = canvasElement.getContext("2d");

           var differenceImage = new Image();
           differenceImage.onload = function(){
             context.clearRect(0, 0, canvasElement.width, canvasElement.height);
             context.drawImage(differenceImage, 0, 0);
           };
           differenceImage.src = data.getImageDataUrl();
           //divElement.innerHTML = differenceImage;
           document.body.appendChild(canvasElement);
        }
        else if(data.misMatchPercentage > 0){
          var context = canvasAlreadyInserted.getContext("2d");

          var differenceImage = new Image();
          differenceImage.onload = function(){
            context.clearRect(0, 0, canvasAlreadyInserted.width, canvasAlreadyInserted.height);
          };
        }
       });
     }else{
       console.log("no image taken yet")
     }
   });
}
