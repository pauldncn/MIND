
	

	var prevX = 0, prevY = 0, curX = 0, curY = 0;
	var butX = 0, butY = 0, butW = 0, butH = 0;
	
	var flag = false;
	var clearflag = false;
	var drawable = false;
	var pen = true;
	var draggable = false;
	
	var startslide = 3;
	var curslide = startslide;
	
	var img;
	var canvas1;
	var canvas2;
	var context1;
	var context2;
	var h=0,w=0;
	var snapConstant = .2;
	
	var numW = .13;
	var numH = .24;
	
	//Looks like a mess, but the array encodes the logic of the slide show.
	//The format is slide image id, whether you can draw on the slide, and a list of buttons with the function and dimensions of each.
	//The last parameter of a link is its destination
	//Dimensions are in terms of percent of the page.
	var slides = [
		['slide0',false,[],false,0],
		['slide1',false,[],false,0],

		//Main Menu
		['slide2',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19],['link',.81,.57,.16,.19,4]],false,0],		
		['slide3',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19],['link',.81,.57,.16,.19,4]],false,0],
		['slide4',false,[['link',.03,.56,.16,.19,startslide]],false,0],

		//Number Digits
		['slide5',false,[['link',.07,.2,.18,.23,6],['link',.29,.2,.18,.23,7],['link',.52,.2,.18,.23,8],['link',.75,.2,.18,.23,9],
		['link',.07,.47,.18,.23,10],['link',.29,.47,.18,.23,11],['link',.52,.47,.18,.23,12],
		['link',.75,.47,.18,.23,13],['link',.88,.83,.1,.13,startslide]],false,0],		
		['slide6',false,[['link',.87,.85,.10,.10,5]],true,4,[[.2,.5,numW,numH],[.38,.5,numW,numH],[.56,.5,numW,numH],[.72,.5,numW,numH]]],
		['slide7',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0],
		['slide8',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0],
		['slide9',false,[['link',.87,.85,.10,.10,5]],true,5,[[.33,.2,numW,numH],[.475,.2,numW,numH],[.62,.2,numW,numH],
		[.475,.45,numW,numH],[.62,.45,numW,numH]]],
		['slide10',false,[['link',.87,.85,.10,.10,5]],true,8,[[.27,.23,numW,numH],[.41,.23,numW,numH],[.56,.23,numW,numH],[.7,.23,numW,numH],
		[.27,.48,numW,numH],[.41,.48,numW,numH],[.56,.48,numW,numH],[.7,.48,numW,numH]]],
		['slide11',false,[['link',.87,.85,.10,.10,5]],true,7,[[.235,.2,numW,numH],[.38,.2,numW,numH],[.525,.2,numW,numH],[.67,.2,numW,numH],
		[.38,.45,numW,numH],[.525,.45,numW,numH],[.67,.45,numW,numH]]],
		['slide12',false,[['link',.87,.85,.10,.10,5]],true,9,[[.135,.2,numW,numH],[.28,.2,numW,numH],[.425,.2,numW,numH],[.57,.2,numW,numH],[.715,.2,numW,numH],
		[.28,.45,numW,numH],[.425,.45,numW,numH],[.57,.45,numW,numH],[.715,.45,numW,numH]]],
		['slide13',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]],false,0],

		//Continuous Shapes
		['slide14',false,[['link',.07,.29,.18,.22,15],['link',.29,.29,.18,.22,16],['link',.52,.29,.18,.22,17],['link',.74,.29,.18,.22,18],
		['link',.88,.83,.1,.13,startslide]],false,0],
		['slide15',false,[['link',.87,.85,.10,.10,14]],false,0],
		['slide16',false,[['link',.87,.85,.10,.10,14]],false,0],
		['slide17',false,[['link',.87,.85,.10,.10,14]],false,0],
		['slide18',false,[['link',.87,.85,.10,.10,14]],false,0],
		
		//Lines of Symmetry
		['slide19',false,[['link',.07,.2,.18,.23,20],['link',.29,.2,.18,.23,21],['link',.52,.2,.18,.23,22],['link',.75,.2,.18,.23,23],
		['link',.07,.47,.18,.23,24],['link',.29,.47,.18,.23,25],['link',.88,.83,.1,.13,startslide]],false,0],
		['slide20',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
		['slide21',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
		['slide22',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
		['slide23',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
		['slide24',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
		['slide25',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]],false,0],
	];
	
	var dragNums = [['numone',1,0,.1,.1,false],['numtwo',1,.1,.1,.1,false],['numthree',1,.2,.1,.1,false],['numfour',1,.3,.1,.1,false],['numfive',0,.4,.1,.1,false],
		['numsix',0,.5,.1,.1,false],['numseven',0,.6,.1,.1,false],['numeight',0,.7,.1,.1,false],['numnine',0,.8,.1,.1,false]];
	var numsEnabled = 0;

	var held = null;
	var boxes = [];
	var snapped = false;
	
	function init() {
		canvas1 = document.getElementById( 'canvas1' );
		context1  = canvas1.getContext( "2d" );
		
		canvas2 = document.getElementById( 'canvas2' );
		context2  = canvas2.getContext( "2d" );
		
		// Just innerwidth/innerheight makes a scroll bar appear, not sure if I am doing something wrong here
		context1.canvas.width  = window.innerWidth - 25;
		context1.canvas.height = window.innerHeight - 25;
		context2.canvas.width  = window.innerWidth - 25;
		context2.canvas.height = window.innerHeight - 25;
		draw();
		
		document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
		document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);
		canvas2.addEventListener('mousedown', function(e) {

			prevX = curX;
			prevY = curY;
			curX = e.pageX - canvas1.offsetLeft;
			curY = e.pageY - canvas1.offsetTop;
			h = canvas1.height;
			w = canvas1.height*img.width/img.height;
			
			
			var butX = 0, butY = 0, butW = 0, butH = 0;
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
							numsEnabled = slides[curslide][4];
							boxes = slides[curslide][5];
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
				for(i=0;i<numsEnabled;i++) {
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
		}, false);
		
		canvas2.addEventListener('mousemove', function(e) {
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
					if (curX > (boxes[i][0]+snapConstant*boxes[i][2])*w && curX < (boxes[i][0] + (1-snapConstant)*boxes[i][2])*w && 
					curY > (boxes[i][1]+snapConstant*boxes[i][3])*h && curY < (boxes[i][1] + (1-snapConstant)*boxes[i][3])*h) {
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
		}, false);
		
		canvas2.addEventListener('mouseup', function(e) {
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
		}, false);
		
		canvas2.addEventListener('mouseout', function(e) {
			flag = false;
			held = null;
		}, false);
	}
	
	function draw() {
		context1.clearRect(0, 0, canvas1.width, canvas1.height);
		img = document.getElementById(slides[curslide][0]);
		context1.drawImage(img,0,0,canvas1.height*img.width/img.height, canvas1.height);
		if(draggable) {
			drawDraggable();
		}
	}
	
	function drawDraggable() {
		context2.clearRect(0,0,canvas2.width,canvas2.height);
		for(i=0;i<numsEnabled;i++) {
			context2.drawImage(document.getElementById(dragNums[i][0]),dragNums[i][1]*w,dragNums[i][2]*h,dragNums[i][3]*w,dragNums[i][4]*h);
		}
		for(i=0;i<boxes.length;i++) {
			context1.drawImage(document.getElementById('box'),boxes[i][0]*w,boxes[i][1]*h,boxes[i][2]*w,boxes[i][3]*h);
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
