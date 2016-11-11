var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var canvas;
var context;


	// Defining Canvas =====================================
	var canvasWidth = window.innerWidth;
	var canvasHeight = window.innerHeight;
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");

	// Drawing =============================================

	// Start Drawing
	$('#canvas').mousedown(function(e){
	  var mouseX = e.pageX - this.offsetLeft;
	  var mouseY = e.pageY - this.offsetTop;
			
	  paint = true;
	  addClick(mouseX, mouseY, false);
	  redraw();
	});

	// Draw as mouse moves
	$('#canvas').mousemove(function(e){
	  if(paint){
	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	    redraw();
	  }
	});

	// Stop Drawing
	$('#canvas').mouseup(function(e){
	  paint = false;
	  redraw();
	});

	$('#canvas').mouseleave(function(e){
		paint = false;
	});

	// Clear Canvas

	$('#clearBtn').mousedown(function(e)
	{
		clickX = new Array();
		clickY = new Array();
		clickDrag = new Array();
		clearCanvas(); 
	})

	canvas.addEventListener("touchstart", function(e)
	{
		// Mouse down location
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
			mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
		
		paint = true;
		addClick(mouseX, mouseY, false);
		redraw();
	}, false);
	canvas.addEventListener("touchmove", function(e){
		
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
			mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
					
		if(paint){
			addClick(mouseX, mouseY, true);
			redraw();
		}
		e.preventDefault()
	}, false);
	canvas.addEventListener("touchend", function(e){
		paint = false;
	  	redraw();
	}, false);
	canvas.addEventListener("touchcancel", function(e){
		paint = false;
	}, false);



function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function clearCanvas()
{
	context.clearRect(0, 0, canvasWidth, canvasHeight); 
}

function redraw(){
	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	  
	  context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  context.lineWidth = 5;
				
	  for(var i=0; i < clickX.length; i++) {		
	    context.beginPath();
	    if(clickDrag[i] && i){
	      context.moveTo(clickX[i-1], clickY[i-1]);
	     }else{
	       context.moveTo(clickX[i]-1, clickY[i]);
	     }
	     context.lineTo(clickX[i], clickY[i]);
	     context.closePath();
	     context.stroke();
	  }
}

document.getElementById("saveBtn").onclick = function savePaint()
{
	var dataUrl = canvas.toDataURL("image/png");
	console.log(dataUrl);
}