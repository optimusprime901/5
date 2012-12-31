window.addEventListener('load',init,false);

function init(){

	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	tool = "freeHand";
	mouseDownBoolean = false;
	drawX = drawY =null;

	strokeStyleColor="black";
	fillStyleColor="black";

	canvas.addEventListener('touchstart',mouseDown,false);
	canvas.addEventListener('touchmove',mouseMove,false);
	canvas.addEventListener('touchend',mouseUp,false);

	window.addEventListener('touchstart',mouseDownw,false);
	window.addEventListener('touchmove',mouseMovew,false);
	window.addEventListener('touchend',mouseUpw,false);
	
	strokeStyle = document.getElementById('strokeStyle');
	strokeStyle.addEventListener('change',strokeStyleColorChange,false);

	fillStyle = document.getElementById('fillStyle');
	fillStyle.addEventListener('change',fillStyleColorChange,false);

    toolElement  = document.getElementById('toolElement');
    toolElement.addEventListener('change',toolChange,false);


	freeHandObj = new freeHand();
	strokeRectangleObj = new strokeRectangle();
	fillRectangleObj = new fillRectangle();
	
}

function mouseDownw(e){
e.preventDefault();
}

function mouseMovew(e){
e.preventDefault();
}

function mouseUpw(e){
e.preventDefault();
}


function mouseUp(e){

	drawX = e.pageX-canvas.offsetLeft;
	drawY = e.pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseUp(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseUp(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseUp(e,drawX,drawY);
		break;
	}
	
}

function mouseDown(e){
	
	drawX = e.pageX-canvas.offsetLeft;
	drawY = e.pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseDown(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseDown(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseDown(e,drawX,drawY);
		break;
	}

}

function mouseMove(e){
	
	drawX = e.pageX-canvas.offsetLeft;
	drawY = e.pageY-canvas.offsetTop;

	switch(tool){

		case "freeHand":
		freeHandObj.mouseMove(e,drawX,drawY);
		break;

		case "strokeRectangle":
		strokeRectangleObj.mouseMove(e,drawX,drawY);
		break;

		case "fillRectangle":
		fillRectangleObj.mouseMove(e,drawX,drawY);
		break;
	}
	
}


function paint(){

	ctx.strokeStyle = strokeStyleColor;
	ctx.fillStyle = fillStyleColor; 

}



//strokeStyleChange
function strokeStyleColorChange(e){

	target = e.target;
	strokeStyleColor = target.value;
	paint();
}

function fillStyleColorChange(e){

	target = e.target;
	fillStyleColor = target.value;
	paint();
}

function toolChange(e){

	target = e.target;
	tool = target.value;
}















function freeHand(){
//mouseEvents

this.mouseUp = function(e,x,y){
	mouseDownBoolean = false;
	drawX = x;
	drawY = y;
	ctx.lineTo(drawX+1,drawY+1);
	ctx.stroke();
}

this.mouseDown = function(e,x,y){

	drawX = x;
	drawY = y;
	
	ctx.beginPath();
	ctx.moveTo(drawX,drawY);
	

	mouseDownBoolean = true;
	//paint();
}

  this.mouseMove =function (e,x,y){
	if(mouseDownBoolean){
		drawX = x;
		drawY = y;

	ctx.lineTo(drawX,drawY);
	ctx.stroke();
	}
	//paint();
}

}//end of freeHand





















function strokeRectangle(){

this.strokeRectangle = function(){
	 var mouseDownBoolean = false;
	 var drawX = drawY2 = drawY = drawX2 = null;
	 var drew = false;
	 var w = h =0;

}
	this.mouseUp = function(e,x,y){
		//if(drew){
		mouseDownBoolean = false;
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
		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.w,100,100);
		}
	}

}//end of StrokeRectangle























function fillRectangle(){

this.fillRectangle = function(){
	 var mouseDownBoolean = false;
	 var drawX = drawY2 = drawY = drawX2 = null;
	 var drew = false;
	 var w = h =0;

}
	this.mouseUp = function(e,x,y){
		//if(drew){
		mouseDownBoolean = false;
		ctx.fillRect(this.drawX,this.drawY,this.w,this.h);
		//drew = false;
	//}
	}


	this.mouseDown = function(e,x,y){
		this.drawX = x;
		this.drawY = y;
		w= 10;
		h=10;
		mouseDownBoolean = true;
		//drew = true;
	}

	this.mouseMove = function(e,x,y){
		if(mouseDownBoolean){
		this.drawX2 = x;
		this.drawY2 = y;
		this.w = this.drawX2 - this.drawX/*this.drawX2>this.drawX ? this.drawX2 - this.drawX:this.drawX - this.drawX2*/;
		this.h = this.drawY2 - this.drawY/*this.drawY2>this.drawY? this.drawY2 - this.drawY: this.drawY - this.drawY2*/;
		/*this.w = (this.w<0)? -this.w:this.w;
		this.h = (this.h<0)? -this.h:this.h;*/
		//ctx.clearRect(0,0,800,600);
		//ctx.fillText(this.drawX + " " + this.drawX2,100,100);
		}
	}

}