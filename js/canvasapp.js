window.onload = canvasApp;

function canvasApp() {

  function drawScreen() {
    var theCanvas = document.getElementById("canvasOne");
    var context = theCanvas.getContext("2d");

    context.fillStyle = "#ffffaa";
    context.fillRect(0, 0, 500, 300);

    context.fillStyle  = "#000000";
    context.font = "20px Sans-Serif";
    context.textBaseline = "top";
    context.fillText  ("Hello World!", 195, 80);

    var helloWorldImage = new Image();
    helloWorldImage.onload = function () {
      context.drawImage(helloWorldImage, 160, 130);
    }
    helloWorldImage.src = "img/melon_cut.jpg";

    context.strokeStyle = "#000000";
    context.strokeRect(5,  5, 490, 290);
   }

   drawScreen();

}
