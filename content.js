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
         if(data.misMatchPercentage > 0){
           var canvasElement = document.createElement("canvas");
           canvasElement.id = "1337Overlay";
           canvasElement.style.display = "block";
           canvasElement.style.position = "fixed";
           canvasElement.style.height = "100%";
           canvasElement.style.width = "100%";
           canvasElement.style.top = "0";
           canvasElement.style.left = "0";
           canvasElement.style.right = "0";
           canvasElement.style.bottom = "0";
           canvasElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
           canvasElement.style.zIndex = "2";
           canvasElement.onclick = function(){
             document.getElementById("1337Overlay").style.display = "none";
           };
           var context = canvasElement.getContext("2d");

           var differenceImage = new Image();
           differenceImage.onload = function(){
             context.drawImage(differenceImage, canvasElement.width / 2 - differenceImage.width / 2, canvasElement.height / 2 - differenceImage.height / 2);
           };
           differenceImage.src = data.getImageDataUrl();
           //divElement.innerHTML = differenceImage;
           document.body.appendChild(canvasElement);
        }
       });
     }else{
       console.log("no image taken yet")
     }
   });
}
