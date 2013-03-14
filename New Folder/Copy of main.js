window.addEventListener('load',init,false);

function init(){

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	tool = "freeHand";
	mouseDownBoolean = false;
	drawX = drawY =null;

	strokeStyleColor="black";
	fillStyleColor="black";
	lineWidth = 1;
	lineLength = 10;
	canvasWidth = canvas.width;
	canvasHeight = canvas.height;
	bgColor = "white";
	bgColorActivated = false;
	lineJoin="round";
	lineCap="round";
	globalAlpha = 1;
	shadowBlur = 0;
	shadowColor = "blue";
	undoIndex =-1;
	undoRedoImageArray = new Array();
	symmetry = true;

	imageData = ctx.createImageData(canvas.width,canvas.height);

	glowImg = new Image();
	glowImg.src = "download.png";

	canvas.addEventListener('mousedown',mouseDown,false);
	canvas.addEventListener('mousemove',mouseMove,false);
	canvas.addEventListener('mouseup',mouseUp,false);
	
	colorElement = document.getElementById('color');
	colorElement.addEventListener('change',colorChange,false);

    toolElement  = document.getElementById('toolElement');
    toolElement.addEventListener('change',toolChange,false);

    lineWidthElement = document.getElementById('lineWidthElement');
    lineWidthElement.addEventListener('change',lineWidthChange,false);

    lineLengthElement = document.getElementById('lineLengthElement');
    lineLengthElement.addEventListener('change',lineLengthChange,false);

    clearElement = document.getElementById('clearElement');
    clearElement.addEventListener('click',clear,false);

    saveImageElement = document.getElementById('saveImageElement');
    saveImageElement.addEventListener('click',save,false);

    canvasWidthElement = document.getElementById('canvasWidthElement');
  //  canvasWidthElement.addEventListener('click',canvasWidthChange,false);

    canvasHeightElement = document.getElementById('canvasHeightElement');
  //  canvasHeightElement.addEventListener('click',canvasHeightChange,false);

    setCanvasSizeElement = document.getElementById('setCanvasSizeElement');
    setCanvasSizeElement.addEventListener('click',setCanvasSizeChange,false);

    bgColorElement = document.getElementById('bgColorElement');
    bgColorElement.addEventListener('change',bgColorChange,false);

    brushJoinElement = document.getElementById('brushJoinElement');;
    brushJoinElement.addEventListener('change',brushJoinChange,false);

    brushCapElement = document.getElementById('brushCapElement');
    brushCapElement.addEventListener('change',brushCapChange,false);
	
    opacityElement = document.getElementById('opacity');
    opacityElement.addEventListener('change',opacityChange,false);

    glowSizeElement = document.getElementById('glowSizeElement');
    glowSizeElement.addEventListener('change',glowSizeChange,false);

    undoElement = document.getElementById('undoElement');
    undoElement.addEventListener('click',undo,false);

    redoElement = document.getElementById('redoElement');
    redoElement.addEventListener('click',redo,false);

    invertElement = document.getElementById('invertElement');
    invertElement.addEventListener('click',invert,false);

	freeHandObj = new freeHand();
	freeHandObj2 = new freeHand();
	strokeRectangleObj = new strokeRectangle();
	strokeRectangleObj2 = new strokeRectangleSymmetry();
	fillRectangleObj = new fillRectangle();
	fillRectangleObj2 = new fillRectangleSymmetry();
	lineObj = new line();
	lineObj2 = new line();
	continousLinesObj = new continousLines();
	continousLinesObj2 = new continousLines();
	strokeCircleObj = new strokeCircle();
	strokeCircleObj2 = new strokeCircle();
	fillCircleObj = new fillCircle();
	fillCircleObj2 = new fillCircle();
	glowingPencilObj = new glowingPencil();
	glowingPencilObj2 = new glowingPencil();
	eraserObj = new eraser();
	eraserObj2 = new eraser();
	
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	ctx.fillStyle ="black";
	saveImage();
	paint();
}


function mouseUp(e){

	this.drawX = e.pageX-canvas.offsetLeft;
	this.drawY = e.pageY-canvas.offsetTop;

	saveImage();

	toolList(e,"up",this.drawX,this.drawY);
//toolList(e,"move",mouseMove.drawX,mouseMove.drawY);

	if(symmetry){

		if(this.drawX>canvas.width/2){
			this.x2=(canvas.width/2)-(this.drawX-canvas.width/2);
			
			toolList2(e,"up",this.drawX,this.drawY,this.x2,this.drawY);
		}

		else{
			this.x2 =(canvas.width/2)+(canvas.width/2-this.drawX);
			toolList2(e,"up",this.x2,this.drawY);
		}
	}
	
}

function mouseDown(e){
	
	//saveImage();

	this.drawX = e.pageX-canvas.offsetLeft;
	this.drawY = e.pageY-canvas.offsetTop;

	toolList(e,"down",this.drawX,this.drawY);

	if(symmetry){

		if(this.drawX>canvas.width/2){
			this.x2=(canvas.width/2)-(this.drawX-canvas.width/2);
			
			toolList2(e,"down",this.drawX,this.drawY,this.x2,this.drawY);
		}

		else{
			this.x2 =(canvas.width/2)+(canvas.width/2-this.drawX);
			toolList2(e,"down",this.x2,this.drawY);
		}
	}

}

function mouseMove(e){
	
	this.drawX = e.pageX-canvas.offsetLeft;
	this.drawY = e.pageY-canvas.offsetTop;

	toolList(e,"move",this.drawX,this.drawY);
	
	if(symmetry){

		if(this.drawX>canvas.width/2){
			this.x2=(canvas.width/2)-(this.drawX-canvas.width/2);
			//toolList(e,"move",this.drawX,this.drawY);
			toolList2(e,"move",this.x2,this.drawY,this.drawX,this.drawY);
			//toolList(e,"move",this.drawX,this.drawY);
			document.getElementById("mess").innerHTML=this.drawX + " " + this.x2;
		}

		else{
			this.x2 =(canvas.width/2)+(canvas.width/2-this.drawX);
			toolList2(e,"move",this.x2,this.drawY,this.drawX,this.drawY);
		}
		//toolList(e,"move",this.drawX,this.drawY);
	}

}


function toolList(e,mouseEvent,x,y){

//up
	if(mouseEvent=="up"){

	switch(tool){

		case "freeHand":
		freeHandObj.mouseUp(e,x,y);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseUp(e,x,y);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseUp(e,x,y);
		break;

		case "line":
		lineObj.mouseUp(e,x,y);
		break;

		case "continousLines":
		continousLinesObj.mouseUp(e,x,y);
		break;

		case "strokeCircle":
		strokeCircleObj.mouseUp(e,x,y);
		break;

		case "fillCircle":
		fillCircleObj.mouseUp(e,x,y);
		break;

		case "glowingPencil":
		glowingPencilObj.mouseUp(e,x,y);
		break;

		case "eraser":
		eraserObj.mouseUp(e,x,y);
		break;
	}
}



//down
	if(mouseEvent=="down"){
	switch(tool){

		case "freeHand":
		freeHandObj.mouseDown(e,x,y);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseDown(e,x,y);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseDown(e,x,y);
		break;

		case "line":
		lineObj.mouseDown(e,x,y);
		break;

		case "continousLines":
		continousLinesObj.mouseDown(e,x,y);
		break;

		case "strokeCircle":
		strokeCircleObj.mouseDown(e,x,y);
		break;

		case "fillCircle":
		fillCircleObj.mouseDown(e,x,y);
		break;

		case "glowingPencil":
		glowingPencilObj.mouseDown(e,x,y);
		break;

		case "eraser":
		eraserObj.mouseDown(e,x,y);
		break;
	}
}



//move
	if(mouseEvent=="move"){
	switch(tool){

		case "freeHand":
		freeHandObj.mouseMove(e,x,y);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseMove(e,x,y);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseMove(e,x,y,"1");
		document.getElementById("mess").innerHTML="asd";
		break;

		case "line":
		lineObj.mouseMove(e,x,y);
		break;

		case "continousLines":
		continousLinesObj.mouseMove(e,x,y);
		break;

		case "strokeCircle":
		strokeCircleObj.mouseMove(e,x,y);
		break;

		case "fillCircle":
		fillCircleObj.mouseMove(e,x,y);
		break;

		case "glowingPencil":
		glowingPencilObj.mouseMove(e,x,y);
		break;

		case "eraser":
		eraserObj.mouseMove(e,x,y);
		break;
	}
	}




}








function toolList2(e,mouseEvent,xx,yy,xx2,yy2){

//up
	if(mouseEvent=="up"){

	switch(tool){

		case "freeHand":
		freeHandObj2.mouseUp(e,xx,yy);
		break;

		case "strokeRectangle":
		strokeRectangleObj2.mouseUp(e,xx,yy,xx2,yy2);
		break;

		case "fillRectangle":
		fillRectangleObj2.mouseUp(e,xx,yy,xx2,yy2);
		break;

		case "line":
		lineObj2.mouseUp(e,xx,yy);
		break;

		case "continousLines":
		continousLinesObj2.mouseUp(e,xx,yy);
		break;

		case "strokeCircle":
		strokeCircleObj2.mouseUp(e,xx,yy);
		break;

		case "fillCircle":
		fillCircleObj2.mouseUp(e,xx,yy);
		break;

		case "glowingPencil":
		glowingPencilObj2.mouseUp(e,xx,yy);
		break;

		case "eraser":
		eraserObj2.mouseUp(e,xx,yy);
		break;
	}
}



//down
	if(mouseEvent=="down"){
	switch(tool){

		case "freeHand":
		freeHandObj2.mouseDown(e,xx,yy);
		break;

		case "strokeRectangle":
		strokeRectangleObj2.mouseDown(e,xx,yy,xx2,yy2);
		break;

		case "fillRectangle":
		fillRectangleObj2.mouseDown(e,xx,yy,xx2,yy2);
		break;

		case "line":
		lineObj2.mouseDown(e,xx,yy);
		break;

		case "continousLines":
		continousLinesObj2.mouseDown(e,xx,yy);
		break;

		case "strokeCircle":
		strokeCircleObj2.mouseDown(e,xx,yy);
		break;

		case "fillCircle":
		fillCircleObj2.mouseDown(e,xx,yy);
		break;

		case "glowingPencil":
		glowingPencilObj2.mouseDown(e,xx,yy);
		break;

		case "eraser":
		eraserObj2.mouseDown(e,xx,yy);
		break;
	}
}



//move
	if(mouseEvent=="move"){
	switch(tool){

		case "freeHand":
		freeHandObj2.mouseMove(e,xx,yy);
		break;

		case "strokeRectangle":
		strokeRectangleObj2.mouseMove(e,xx,yy,xx2,yy2);
		break;

		case "fillRectangle":
		fillRectangleObj2.mouseMove(e,xx,yy,xx2,yy2);
		break;

		case "line":
		lineObj2.mouseMove(e,xx,yy);
		break;

		case "continousLines":
		continousLinesObj2.mouseMove(e,xx,yy);
		break;

		case "strokeCircle":
		strokeCircleObj2.mouseMove(e,xx,yy);
		break;

		case "fillCircle":
		fillCircleObj2.mouseMove(e,xx,yy);
		break;

		case "glowingPencil":
		glowingPencilObj2.mouseMove(e,xx,yy);
		break;

		case "eraser":
		eraserObj2.mouseMove(e,xx,yy);
		break;
	}
	}




}




function paint(){

	//canvas.width = canvasWidth;
	//canvas.height = canvasHeight;
	ctx.shadowBlur = shadowBlur;
	ctx.shadowColor = shadowColor;
	if(bgColorActivated){
	ctx.fillStyle = bgColor;
	ctx.fillRect(0,0,canvas.width,canvas.height);
	bgColorActivated = false;
}
	ctx.globalAlpha = globalAlpha;
	ctx.lineJoin = lineJoin;
	ctx.lineCap = lineCap;
	ctx.strokeStyle = strokeStyleColor;
	ctx.fillStyle = fillStyleColor; 
	ctx.lineWidth = lineWidth;

}



//strokeStyleChange
function colorChange(e){

	target = e.target;
	strokeStyleColor = target.value;
	fillStyleColor = target.value;
	paint();
}


function toolChange(e){

	target = e.target;
	tool = target.value;
}

function lineWidthChange(e){
	target = e.target;
	lineWidth = target.value;
	paint();
}

function lineLengthChange(e){
	target = e.target;
	lineLength = target.value;
}

function clear(){
	ctx.clearRect(0,0,800,600);	
}

function save(){

	imgData = canvas.toDataURL();
	window.open(imgData);
}

function setCanvasSizeChange(){

	//canvasWidth = canvasWidthElement.value;
	//canvasHeight = canvasHeightElement.value;
	canvas.setAttribute("width",canvasWidthElement.value);
	canvas.setAttribute("height",canvasHeightElement.value);
	paint();
}

function bgColorChange(e){

	bgColor = e.target.value;
	bgColorActivated = true;
	//saveImage();
	paint();
	saveImage();
}

function brushJoinChange(e){

	lineJoin = e.target.value;
	paint();
}

function brushCapChange(e){

	lineCap = e.target.value;
	paint();
}

function opacityChange(e){

	globalAlpha = e.target.value;
	paint();
}

function glowSizeChange(e){

	shadowBlur = e.target.value;
	paint();
}

function invert(){

saveImage();
	var img = ctx.getImageData(0,0,canvas.width,canvas.height);
	var imgData = img.data;
	for(var i=0;i<imgData.length;i+=4){
		imgData[i]=255-imgData[i];
		imgData[i+1]=255-imgData[i+1];
		imgData[i+2]=255-imgData[i+2];
		//imgData[i+3]=255-imgData[i+3];
	}

	ctx.putImageData(img,0,0);
	saveImage();
}










function saveImage(){

	undoRedoImageArray.push(ctx.getImageData(0,0,canvas.width,canvas.height));
	undoIndex++;
}

function undo(){

	if(undoIndex>0){

		ctx.putImageData(undoRedoImageArray[undoIndex-1],0,0);
		undoIndex--;
	}
}

function redo(){

	if(undoIndex<undoRedoImageArray.length){

		ctx.putImageData(undoRedoImageArray[undoIndex+1],0,0);
		undoIndex++;

	}
}








function freeHand(){
//mouseEvents

	this.drawX = this.drawY = 0;
	this.mouseDownBoolean = false;
	this.lastX =0;
	this.lastY=0;

this.mouseUp = function(e,x,y){
	this.mouseDownBoolean = false;
	ctx.closePath();
}

this.mouseDown = function(e,x,y){

	this.lastX = x;
	this.lastY = y;
	
	ctx.beginPath();
	ctx.moveTo(this.drawX,this.drawY);
	

	this.mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(this.mouseDownBoolean){
		this.drawX = x;
		this.drawY = y;

		//ctx.closePath();
	ctx.moveTo(this.lastX,this.lastY);

	ctx.lineTo(this.drawX,this.drawY);
	ctx.stroke();
	this.lastX = this.drawX;
	this.lastY = this.drawY;
	//ctx.closePath();
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(drawX+ " " +lineLength,100,100);
	}
	//paint();
}

}//end of freeHand




































function eraser(){
//mouseEvents


	this.drawX = this.drawY = this.mouseX = this.mouseY = 0;
	this.mouseDownBoolean = false;
	this.w=0;
	this.fillStyleDummy ="black";

this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;
	ctx.fillStyle = this.fillStyleDummy;
	
}

this.mouseDown = function(e,x,y){

	this.fillStyleDummy = ctx.fillStyle;

	this.mouseX = x;
	this.mouseY = y;

	var w=10;

	this.drawX = mouseX-w;
	this.drawY = mouseY-w;

	ctx.fillStyle = bgColor;
	ctx.fillRect(drawX,drawY,w,w);
	
	

	mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){
		
	this.mouseX = x;
	this.mouseY = y;

	var w=10;

	this.drawX = mouseX-w;
	this.drawY = mouseY-w;

	ctx.fillStyle = bgColor;
	ctx.fillRect(drawX,drawY,w,w);
	
	}
	//paint();
}

}//end of earser





















function strokeRectangle(){


	 this.mouseDownBoolean = false;
	 this.drawX = this.drawY2 = this.drawY = this.drawX2 = 0;
	 this.drew = false;
	 this.w = this.h =0;


	this.mouseUp = function(e,x,y){
		//if(drew){
		mouseDownBoolean = false;
		
		//ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		
		//drew = false;
	//}
	}


	this.mouseDown = function(e,x,y){
		this.drawX = x;
		this.drawY = y;
		w= 10;
		h=10;
		mouseDownBoolean = true;

		imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(mouseDownBoolean){
			if(this.drawX2!=x || this.drawY2!=y){

		
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.w,100,100);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		}

		}
	}

}//end of StrokeRectangle



















function strokeRectangleSymmetry(){


	 this.mouseDownBoolean = false;
	 this.drawX = this.drawY2 = this.drawY = this.drawX2 = 0;
	 this.drew = false;
	 this.w = this.h =0;


	this.mouseUp = function(e,x,y,x2,y2){
		//if(drew){
		mouseDownBoolean = false;
		
		//ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		
		//drew = false;
	//}
	}


	this.mouseDown = function(e,x,y,x2,y2){
		this.drawX = x;
		this.drawY = y;
		w= 10;
		h=10;
		mouseDownBoolean = true;

		imageData = ctx.getImageData(0,0,canvas.width,canvas.height);

		//drew = true;
	}

	this.mouseMove = function(e,x,y,x2,y2){
		if(mouseDownBoolean){
			if(this.drawX2!=x || this.drawY2!=y){

		
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.w,100,100);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.strokeRect(this.drawX,this.drawY,this.w,this.h);
		}

		}
	}

}//end of StrokeRectangle




















function fillRectangle(){


	 this.mouseDownBoolean = false;
	 this.drawX = this.drawY2 = this.drawY = this.drawX2 = null;
	 this.drew = false;
	 this.w = this.h =0;


	this.mouseUp = function(e,x,y){
		//if(drew){
		this.mouseDownBoolean = false;
		//ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		//drew = false;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		
	//}
	}


	this.mouseDown = function(e,x,y){
		this.drawX = x;
		this.drawY = y;
		this.w= 10;
		this.h=10;
		this.mouseDownBoolean = true;

		imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(this.mouseDownBoolean){
			if(this.drawX2!=x || this.drawY2!=y){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.drawX2,100,100);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		}
		document.getElementById("mess").innerHTML="obj";

	}
	}

}
















function fillRectangleSymmetry(){


	 this.mouseDownBoolean = false;
	 this.drawX = this.drawY2 = this.drawY = this.drawX2 = null;
	 this.drew = false;
	 this.w = this.h =0;


	this.mouseUp = function(e,x,y,x2,y2){
		//if(drew){
		this.mouseDownBoolean = false;
		//ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		//drew = false;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		
	//}
	}


	this.mouseDown = function(e,x,y,x2,y2){
		this.drawX = x;
		this.drawY = y;
		this.w= 10;
		this.h=10;
		this.mouseDownBoolean = true;

		this.drawX31 = x2;
		this.drawY31 = y2;

		imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
		//drew = true;
	}

	this.mouseMove = function(e,x,y,x2,y2){
		if(this.mouseDownBoolean){
			if(this.drawX2!=x || this.drawY2!=y){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		
		this.drawX32 = x2;
		this.drawY32 = y2;

		this.w2 = this.drawX32-this.drawX31;
		this.h2 = this.drawY32-this.drawY31;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.drawX2,100,100);
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		ctx.fillRect(this.drawX31,this.drawY31,this.w2,this.h2);
		}
		document.getElementById("mess").innerHTML="";

	}
	}

}


























function line(){

this.line = function(){

	var drawX = drawY = drawX2 = drawY2 = 0;
}

this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;

	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.putImageData(imageData,0,0);
	ctx.beginPath();
    ctx.moveTo(this.drawX,this.drawY);
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	
	//ctx.moveTo(this.drawX,this.drawY);
	

	mouseDownBoolean = true;

	imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){
		
		this.drawX2 = x;
		this.drawY2 = y;

	ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.putImageData(imageData,0,0);
	ctx.beginPath();
	ctx.moveTo(this.drawX,this.drawY);
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();

	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	}
	//paint();
}

}//end of line




































function continousLines(){

this.continousLines = function(){
var drawX = drawY = null;

//ctx.moveTo(0,0);
}

this.mouseUp = function(e,x,y){
	/*mouseDownBoolean = false;
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();*/
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	ctx.lineTo(this.drawX,this.drawY);
	ctx.closePath();
	ctx.stroke();
	ctx.moveTo(this.drawX,this.drawY);
	

	//mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	//if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;

	
	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	//}
}

}//end of cont lines































function strokeCircle(){

this.strokeCircle = function(){
var drawX = drawY = drawX2 = drawY2 = null;
var mouseDownBoolean =false;

//ctx.moveTo(0,0);
}

this.mouseUp = function(e,x,y){
	/*mouseDownBoolean = false;
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();*/
	this.mouseDownBoolean = false;
	//ctx.beginPath();
	
	//ctx.closePath();
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	
    
    ctx.beginPath();
    ctx.arc(this.drawX,this.drawY,25,0,2*Math.PI,false);
	ctx.stroke();
	//document.getElementById("mess").innerHTML="moving";

	this.mouseDownBoolean = true;
	//mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(this.mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
//document.getElementById("mess").innerHTML="moving";
	ctx.beginPath();
	ctx.arc(this.drawX2,this.drawY2,25,0,2*Math.PI,false);
	ctx.stroke();
	//document.getElementById("mess").innerHTML="moving";
	//ctx.closePath();
}
	
	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	//}
}

}//end of stroke circle




































function fillCircle(){

this.fillCircle = function(){
var drawX = drawY = drawX2 = drawY2 = null;
var mouseDownBoolean =false;
document.getElementById("mess").innerHTML="moving";

//ctx.moveTo(0,0);
}

this.mouseUp = function(e,x,y){
	/*mouseDownBoolean = false;
	ctx.lineTo(this.drawX2,this.drawY2);
	ctx.stroke();*/
	this.mouseDownBoolean = false;
	//ctx.beginPath();
	
	//ctx.closePath();
	}

this.mouseDown = function(e,x,y){

	this.drawX = x;
	this.drawY = y;
	
	
    
    ctx.beginPath();
    ctx.arc(this.drawX,this.drawY,25,0,2*Math.PI,false);
	ctx.fill();
	//document.getElementById("mess").innerHTML="moving";

	this.mouseDownBoolean = true;
	//mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(this.mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
//document.getElementById("mess").innerHTML="moving";
	ctx.beginPath();
	ctx.arc(this.drawX2,this.drawY2,25,0,2*Math.PI,false);
	ctx.fill();
	//document.getElementById("mess").innerHTML="moving";
	//ctx.closePath();
}
	
	
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(this.drawX+ " " +this.drawX2,100,100);
	//}
}

}//end of fill circle



















function glowingPencil(){

this.init = function(){
	this.drawX = drawY = 0;
	this.mouseDownBoolean = false;
	shadowBlur = 10;
	this.strokeStyleColorStore;
	this.fillStyleColorStore;
	paint();
	document.getElementById("mess").innerHTML="moving";

this.lastX =0;
this.lastY=0;
}
this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;
	shadowBlur = 0;
	strokeStyleColor = this.strokeStyleColorStore;
	fillStyleColor = this.fillStyleColorStore;
	paint();
	//shadowBlur = 0;
	
	//document.getElementById("mess").innerHTML="moving";
}

this.mouseDown = function(e,x,y){

this.init();
this.strokeStyleColorStore = strokeStyleColor;
this.fillStyleColorStore = fillStyleColor;
	strokeStyleColor = fillStyleColor = "white";
	this.lastX = x;
	this.lastY = y;
	
	ctx.beginPath();
	ctx.moveTo(this.lastX,this.lastY);
	

	mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){

		glowingPencil();
		this.drawX = x;
		this.drawY = y;

		ctx.moveTo(this.lastX,this.lastY);
	ctx.lineTo(this.drawX,this.drawY);
	ctx.stroke();
	this.lastX =this.drawX;
this.lastY=this.drawY;
	//ctx.clearRect(0,0,800,600);
	//ctx.fillText(drawX+ " " +lineLength,100,100);
	}
	//paint();
}

}//end