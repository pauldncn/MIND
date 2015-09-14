
	

	var prevX = 0, prevY = 0, curX = 0, curY = 0;
	var butX = 0, butY = 0, butW = 0, butH = 0;
	var butType;
	
	var flag = false;
	var clearflag = false;
	var drawable = false;
	var pen = true;
	var draggable = false;
	
	var startslide = 2;
	var curslide = startslide;
	
	var img;
	var canvas1;
	var canvas2;
	var context1;
	var context2;
	var h=0,w=0;
	var snapConstant = .2;
	
	
	var numW = 0;
	var numH = 0;
	
	var largeNums = true;
	
	//Looks like a mess, but the array encodes the logic of the slide show.
	//The format is slide image id, whether you can draw on the slide, and a list of buttons with the function and dimensions of each.
	//The last parameter of a link is its destination
	//Dimensions are in terms of percent of the page.
	var slides = [
		['slide0',false,[],false,0,0],
		['slide1',false,[],false,0,0],

		//Main Menu
		['slide2',false,[['link',.04,.18,.4,.25,5],['link',.55,.2,.31,.3,17],['link',.02,.64,.29,.31,22],['link',.81,.57,.16,.19,4],
		['link',.28,.44,.28,.235,29],['link',.45,.71,.34,.25,40]],false,0,0],		
		['slide3',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19],['link',.81,.57,.16,.19,4]],false,0,0],
		['slide4',false,[['link',.03,.56,.16,.19,startslide]],false,0,0],

		//Number Digits
		['slide5',false,[['link',.045,.2,.175,.225,7],['link',.255,.2,.175,.225,8],['link',.46,.2,.175,.225,9],['link',.67,.2,.175,.225,10],
		['link',.045,.465,.175,.225,11],['link',.255,.465,.175,.225,12],['link',.46,.465,.175,.225,13],
		['link',.67,.465,.175,.225,14],['link',.88,.34,.1,.195,6],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide6',false,[['link',.025,.34,.1,.195,5],['link',.15,.2,.175,.22,15],['link',.375,.2,.175,.22,16],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide7',false,[['link',.87,.85,.10,.10,5]],true,0,4,[[.2,.5],[.38,.5],
		[.56,.5],[.72,.5]],[.13,.24]],
		['slide8',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0,0],
		['slide9',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0,0],
		['slide10',false,[['link',.87,.85,.10,.10,5]],true,0,5,[[.33,.2],[.475,.2],[.62,.2],
		[.475,.45],[.62,.45]],[.13,.24]],
		['slide11',false,[['link',.87,.85,.10,.10,5]],true,0,8,[[.27,.23],[.41,.23],
		[.56,.23],[.7,.23],
		[.27,.48],[.41,.48],[.56,.48],[.7,.48]],[.13,.24]],
		['slide12',false,[['link',.87,.85,.10,.10,5]],true,0,7,[[.235,.2],[.38,.2],
		[.525,.2],[.67,.2],
		[.38,.45],[.525,.45],[.67,.45]],[.13,.24]],
		['slide13',false,[['link',.87,.85,.10,.10,5]],true,0,9,[[.135,.2],[.28,.2],
		[.425,.2],[.57,.2],
		[.715,.2],[.28,.45],[.425,.45],[.57,.45],
		[.715,.45]],[.13,.24]],
		['slide14',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0,0],
		['slide15',false,[['link',.87,.85,.10,.10,6]],false,0,0],
		['slide16',false,[['link',.87,.85,.10,.10,6]],false,0,0],

		//Continuous Shapes
		['slide17',false,[['link',.07,.29,.18,.22,18],['link',.29,.29,.18,.22,19],['link',.52,.29,.18,.22,20],['link',.74,.29,.18,.22,21],
		['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide18',false,[['link',.87,.85,.10,.10,17]],false,0,0],
		['slide19',false,[['link',.87,.85,.10,.10,17]],false,0,0],
		['slide20',false,[['link',.87,.85,.10,.10,17]],false,0,0],
		['slide21',false,[['link',.87,.85,.10,.10,17]],false,0,0],
		
		//Lines of Symmetry
		['slide22',false,[['link',.07,.2,.18,.23,23],['link',.29,.2,.18,.23,24],['link',.52,.2,.18,.23,25],['link',.75,.2,.18,.23,26],
		['link',.07,.47,.18,.23,27],['link',.29,.47,.18,.23,28],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide23',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],
		['slide24',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],
		['slide25',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],
		['slide26',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],
		['slide27',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],
		['slide28',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,22]],false,0,0],

		//Square Sums
		['slide29',false,[['link',.045,.2,.175,.225,31],['link',.255,.2,.175,.225,32],['link',.46,.2,.175,.225,33],['link',.67,.2,.175,.225,34],
		['link',.045,.465,.175,.225,35],['link',.255,.465,.175,.225,36],['link',.46,.465,.175,.225,37],
		['link',.67,.465,.175,.225,38],['link',.88,.34,.1,.195,30],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide30',false,[['link',.025,.34,.1,.195,29],['link',.15,.2,.175,.22,39],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide31',false,[['link',.87,.85,.10,.10,29]],true,0,4,[[.35,.41],[.35+.125,.41],
		[.35,.41+.15],[.35+.125,.41+.15]],[.125,.15]],
		['slide32',false,[['link',.87,.85,.10,.10,29]],true,1,5,[[.35,.41],[.35+.125,.41],
		[.35,.41+.15],[.35+.125,.41+.15]],[.125,.15]],
		['slide33',false,[['link',.87,.85,.10,.10,29]],true,5,9,[[.35,.41],[.35+.125,.41],
		[.35,.41+.15],[.35+.125,.41+.15]],[.125,.15]],
		['slide34',false,[['link',.87,.85,.10,.10,29]],true,0,9,[[.28,.255],[.28+.115,.255],
		[.28+2*.115,.255],[.28,.255+.15],[.28+.115,.255+.15],
		[.28+2*.115,.255+.15],[.28,.255+2*.15],[.28+.115,.255+2*.15],
		[.28+2*.115,.255+2*.15]],[.115,.15]],
		['slide35',false,[['link',.87,.85,.10,.10,29]],true,0,9,[[.28,.255],[.28+.115,.255],
		[.28+2*.115,.255],[.28,.255+.15],[.28+.115,.255+.15],
		[.28+2*.115,.255+.15],[.28,.255+2*.15],[.28+.115,.255+2*.15],
		[.28+2*.115,.255+2*.15]],[.115,.15]],
		['slide36',false,[['link',.87,.85,.10,.10,29]],true,0,9,[[.29,.33],[.29+.15,.33],
		[.29+2*.15,.33],[.29,.33+.2],[.29+.15,.33+.2],
		[.29+2*.15,.33+.2],[.29,.33+2*.2],[.29+.15,.33+2*.2],
		[.29+2*.15,.33+2*.2]],[.15,.2]],
		['slide37',false,[['link',.87,.85,.10,.10,29]],true,0,9,[[.293,.385],
		[.293+2*.136,.385],[.293,.385+.182],[.293+.136,.385+.182],[.293+.136,.385+2*.182],
		[.293+2*.136,.385+2*.182]],[.136,.182]],
		['slide38',false,[['link',.87,.85,.10,.10,29]],true,0,9,[[.289,.389],
		[.289+2*.139,.389],[.289,.389+.186],[.289+.139,.389+.186],[.289,.389+2*.186],
		[.289+2*.139,.389+2*.186]],[.139,.186]],
		['slide39',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,30]],false,0,0],
		
		//Shape Decomposition
		['slide40',false,[['link',.07,.2,.18,.23,41],['link',.29,.2,.18,.23,42],['link',.52,.2,.18,.23,43],['link',.75,.2,.18,.23,44],
		['link',.07,.47,.18,.23,46],['link',.29,.47,.18,.23,47],['link',.52,.47,.18,.23,48],['link',.88,.83,.1,.13,startslide]],false,0,0],
		['slide41',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide42',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide43',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide44',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40],
		['link',.81,.08,.16,.21,45]],false,0,0],
		['slide45',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide46',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide47',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,40]],false,0,0],
		['slide48',false,[['link',.87,.85,.10,.10,40]],false,0,0],
	];
	
	var dragNums = [['numone',1,0,.1,.1,false],['numtwo',1,.1,.1,.1,false],['numthree',1,.2,.1,.1,false],['numfour',1,.3,.1,.1,false],['numfive',0,.4,.1,.1,false],
		['numsix',0,.5,.1,.1,false],['numseven',0,.6,.1,.1,false],['numeight',0,.7,.1,.1,false],['numnine',0,.8,.1,.1,false]];
	var numsEnabledMin = 0;
	var numsEnabledMax = 0;

	var held = null;
	var boxes = [];
	var snapped = false;
	
	var touch = null;
	
	function init() {
		canvas1 = document.getElementById( 'canvas1' );
		
		canvas2 = document.getElementById( 'canvas2' );
	
		// Just innerwidth/innerheight makes a scroll bar appear, not sure if I am doing something wrong here
	
		canvas2.addEventListener('mousedown', mouseDownHandler, false);		
		canvas2.addEventListener('mousemove', mouseMoveHandler, false);				
		canvas2.addEventListener('mouseup', mouseUpHandler, false);
		canvas2.addEventListener('mouseout', function(e) {
			flag = false;
			held = null;
		}, false);
		canvas1.addEventListener('touchstart', touchStartHandler, false);	
		canvas1.addEventListener('touchmove', touchMoveHandler, false);		
		canvas1.addEventListener('touchend', touchEndHandler, false);
		canvas1.addEventListener('touchleave', otherHandler, false);
		canvas1.addEventListener('touchcancel', otherHandler, false);
		
		canvas2.addEventListener('touchstart', touchStartHandler, false);	
		canvas2.addEventListener('touchmove', touchMoveHandler, false);		
		canvas2.addEventListener('touchend', touchEndHandler, false);
		canvas2.addEventListener('touchleave', otherHandler, false);
		canvas2.addEventListener('touchcancel', otherHandler, false);

		context1  = canvas1.getContext( "2d" );
		context2  = canvas2.getContext( "2d" );	
		context1.canvas.width  = window.innerWidth - 25;
		context1.canvas.height = window.innerHeight - 25;
		context2.canvas.width  = window.innerWidth - 25;
		context2.canvas.height = window.innerHeight - 25;
		draw();	
		writeText('Version 1.14');
	}
	
	function mouseDownHandler(e) {

		prevX = curX;
		prevY = curY;
		curX = e.pageX - canvas1.offsetLeft;
		curY = e.pageY - canvas1.offsetTop;
		h = canvas1.height;
		w = canvas1.height*img.width/img.height;
		
		// Checking if the click is in a button's area
		for(i=0;i<slides[curslide][2].length;i++) {
			butType = slides[curslide][2][i][0];
			butX = slides[curslide][2][i][1];
			butY = slides[curslide][2][i][2];
			butW = slides[curslide][2][i][3];
			butH = slides[curslide][2][i][4];
			if (curX > butX*w && curX < (butX + butW)*w && curY > butY*h && curY < (butY + butH)*h) {
				//Rudimentary button Feedback
				context1.globalAlpha=0.5;
				context1.fillRect(butX*w,butY*h,butW*w,butH*h);
				context1.globalAlpha=1;
				//Change the slide if the button is a link
				if(butType == 'link') {
					curslide = slides[curslide][2][i][5];
					drawable = slides[curslide][1];
					context2.clearRect(0,0,canvas2.width,canvas2.height);
					held = null;
					draggable = slides[curslide][3];
					if(draggable){
						numsEnabledMin = slides[curslide][4];
						numsEnabledMax = slides[curslide][5];
						boxes = slides[curslide][6];
						numW = slides[curslide][7][0];
						numH = slides[curslide][7][1];
						resetNums();
					}
					writeText(curslide);
				} else if(butType == 'clear') {
					context2.clearRect(0,0,w+50,h);
				} else if(butType == 'pen') {
					pen = true;
				} else if(butType == 'eraser') {
					pen = false;
				}
				break;
			} else {
				//Start drawing the path that the mouse traces
				flag = true;
			}
		}
		if(draggable) {
			for(i=numsEnabledMin;i<numsEnabledMax;i++) {
				if (curX > dragNums[i][1]*w && curX < (dragNums[i][1] + dragNums[i][3])*w && 
				curY > dragNums[i][2]*h && curY < (dragNums[i][2] + dragNums[i][4])*h) {
					held = dragNums[i];
					dragNums[i][1] = curX/w - dragNums[i][3]/2;
					dragNums[i][2] = curY/h - dragNums[i][4]/2;
					drawDraggable();
					break;
				}
			}
		}
	}
	
	function mouseMoveHandler(e) {
		//Draw lines following the mouse
		prevX = curX;
		prevY = curY;
		curX = e.pageX - canvas2.offsetLeft;
		curY = e.pageY - canvas2.offsetTop;
		if(flag && drawable) {
			if(pen) {
				drawLine(prevX,prevY,curX,curY);
				//drawLine(prevX+1,prevY+1,curX-1,curY-1);
				//drawLine(prevX-1,prevY-1,curX+1,curY+1);
			} else {
				context2.clearRect(curX-.025*w, curY-.025*h, .05*w, .05*h);
			}
			
		}
		snapped = false;
		if (draggable && held != null) {	
			for(i=0;i<boxes.length;i++) { 
				if (curX > (boxes[i][0]+snapConstant*numW)*w && curX < (boxes[i][0] + (1-snapConstant)*numW)*w && 
				curY > (boxes[i][1]+snapConstant*numH)*h && curY < (boxes[i][1] + (1-snapConstant)*numH)*h) {
					held[1] = boxes[i][0];
					held[2] = boxes[i][1];
					snapped = true;
					break;
				}
				//dragNums[0][0] = 'erase';
			}
			if (!snapped) {
				held[1] = curX/w - held[3]/2;
				held[2] = curY/h - held[4]/2;
			}
			draw();
		}
	}
	
	function mouseUpHandler(e) {
		//writeText('mouseup');
		flag = false;
		draw();
		drawDraggable;
		//Put an eraser button if appropriate
		if(drawable) {
			context1.drawImage(document.getElementById('clear'),0,.9*h,.1*w,.1*h);
			context1.drawImage(document.getElementById('pen'),.1*w,.9*h,.1*w,.1*h);
			context1.drawImage(document.getElementById('erase'),.2*w,.9*h,.1*w,.1*h);
			
			context1.beginPath();
			if(pen) {
				context1.rect(.1*w,.9*h,.1*w,.1*h);
			} else {
				context1.rect(.2*w,.9*h,.1*w,.1*h);
			}
			context1.stroke();
			context1.closePath();
		}
		held = null;
	}
	
	function touchStartHandler(e) {
		e.preventDefault();
		//writeText('touchstart');
		prevX = curX;
		prevY = curY;
		
		touch = e.touches[0];
		
		curX = touch.pageX;
		curY = touch.pageY;
		h = canvas1.height;
		w = canvas1.height*img.width/img.height;
		
		// Checking if the click is in a button's area
		for(i=0;i<slides[curslide][2].length;i++) {
			butType = slides[curslide][2][i][0];
			butX = slides[curslide][2][i][1];
			butY = slides[curslide][2][i][2];
			butW = slides[curslide][2][i][3];
			butH = slides[curslide][2][i][4];
			if (curX > butX*w && curX < (butX + butW)*w && curY > butY*h && curY < (butY + butH)*h) {
				//Rudimentary button Feedback
				context1.globalAlpha=0.5;
				context1.fillRect(butX*w,butY*h,butW*w,butH*h);
				context1.globalAlpha=1;
				//Change the slide if the button is a link
				if(butType == 'link') {
					curslide = slides[curslide][2][i][5];
					drawable = slides[curslide][1];
					context2.clearRect(0,0,canvas2.width,canvas2.height);
					held = null;
					draggable = slides[curslide][3];
					if(draggable){
						numsEnabledMin = slides[curslide][4];
						numsEnabledMax = slides[curslide][5];
						boxes = slides[curslide][6];
						numW = slides[curslide][7][0];
						numH = slides[curslide][7][1];
						resetNums();
					}
				} else if(butType == 'clear') {
					context2.clearRect(0,0,w+50,h);
				} else if(butType == 'pen') {
					pen = true;
				} else if(butType == 'eraser') {
					pen = false;
				}
				break;
			} else {
				//Start drawing the path that the mouse traces
				flag = true;
			}
		}
		
		if(draggable) {
			for(i=numsEnabledMin;i<numsEnabledMax;i++) {
				if (curX > dragNums[i][1]*w && curX < (dragNums[i][1] + dragNums[i][3])*w && 
				curY > dragNums[i][2]*h && curY < (dragNums[i][2] + dragNums[i][4])*h) {
					held = dragNums[i];
					dragNums[i][1] = curX/w - dragNums[i][3]/2;
					dragNums[i][2] = curY/h - dragNums[i][4]/2;
					drawDraggable();
					break;
				}
			}
		}
	}
	
	function touchMoveHandler(e) {
		e.preventDefault();
		//writeText('touchmove');
		//Draw lines following the mouse
		prevX = curX;
		prevY = curY;
		
		touch = e.touches[0];
			
		curX = touch.pageX;
		curY = touch.pageY;
		console.log("f: "+flag+" D: " + drawable);
		if(flag && drawable) {
			if(pen) {
				
				drawLine(prevX,prevY,curX,curY);
			} else {
				context2.clearRect(curX-.025*w, curY-.025*h, .05*w, .05*h);
			}
				
		}
		
		snapped = false;
		if (draggable && held != null) {	
			for(i=0;i<boxes.length;i++) { 
				if (curX > (boxes[i][0]+snapConstant*numW)*w && curX < (boxes[i][0] + (1-snapConstant)*numW)*w && 
				curY > (boxes[i][1]+snapConstant*numH)*h && curY < (boxes[i][1] + (1-snapConstant)*numH)*h) {
					held[1] = boxes[i][0];
					held[2] = boxes[i][1];
					snapped = true;
					break;
				}
				//dragNums[0][0] = 'erase';
			}
			if (!snapped) {
				held[1] = curX/w - held[3]/2;
				held[2] = curY/h - held[4]/2;
			}
			draw();
		}
	}	
	
	function touchEndHandler(e) {
		//e.preventDefault();
		flag = false;
		draw();
		//writeText('touchend');
		drawDraggable;
		//Put an eraser button if appropriate
		if(drawable) {
			context1.drawImage(document.getElementById('clear'),0,.9*h,.1*w,.1*h);
			context1.drawImage(document.getElementById('pen'),.1*w,.9*h,.1*w,.1*h);
			context1.drawImage(document.getElementById('erase'),.2*w,.9*h,.1*w,.1*h);
			
			context1.beginPath();
			if(pen) {
				context1.rect(.1*w,.9*h,.1*w,.1*h);
			} else {
				context1.rect(.2*w,.9*h,.1*w,.1*h);
			}
			context1.stroke();
			context1.closePath();
		}
		held = null;
	}
	
	function otherHandler(e) {
		e.preventDefault();
	}
	
	function draw() {
		context1.clearRect(0, 0, canvas1.width, canvas1.height);
		img = document.getElementById(slides[curslide][0]);
		context1.drawImage(img,0,0,canvas1.height*img.width/img.height, canvas1.height);
		if(draggable) {
			drawDraggable();
		}
		//writeText('drawn');
	}
	
	function writeText(s) {
		context1.clearRect(0,0,100,15);
		context1.font = "10px Arial";
		context1.strokeText(s,0,10);		
	}
	function drawDraggable() {
		context2.clearRect(0,0,canvas2.width,canvas2.height);
		for(i=numsEnabledMin;i<numsEnabledMax;i++) {
			context2.drawImage(document.getElementById(dragNums[i][0]),dragNums[i][1]*w,dragNums[i][2]*h,dragNums[i][3]*w,dragNums[i][4]*h);
		}
		for(i=0;i<boxes.length;i++) {
			context1.drawImage(document.getElementById('box'),boxes[i][0]*w,boxes[i][1]*h,numW*w,numH*h);
		}
	}
	
	function drawLine(x1,y1,x2,y2) {
		context2.beginPath();
		context2.moveTo(x1, y1);
		context2.lineTo(x2, y2);
		//Ends up jagged on diagonal lines if the width is too big because the lines have to be drawn a little at a time
		context2.lineWidth = 2;
		if(canvas2.height*img.width/img.height - x2 >= 0 && canvas2.height - y2 >= 0) {
			context2.stroke();
		}
		context2.closePath();
	}
	
	function resetNums() {
		for(i=0;i<dragNums.length;i++) {
			dragNums[i][1] = 1+Math.floor(i/3)*numW;
			dragNums[i][2] = numH*(i%3);
			dragNums[i][3] = numW;
			dragNums[i][4] = numH;
		}
	}
