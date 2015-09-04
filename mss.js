
	

	var prevX = 0, prevY = 0, curX = 0, curY = 0;
	var butX = 0, butY = 0, butW = 0, butH = 0;
	
	var flag = false;
	var clearflag = false;
	var drawable = false;
	var pen = true;
	
	var startslide = 3;
	var curslide = startslide;
	
	var img;
	var canvas1;
	var canvas2;
	var context1;
	var context2;
	var h=0,w=0;
	
	//Looks like a mess, but the array encodes the logic of the slide show.
	//The format is slide image id, whether you can draw on the slide, and a list of buttons with the function and dimensions of each.
	//Dimensions are in terms of percent of the page.
	var slides = [
		['slide0',false,[]],
		['slide1',false,[]],

		//Main Menu
		['slide2',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19],['link',.81,.57,.16,.19,4]]],		
		['slide3',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19],['link',.81,.57,.16,.19,4]]],
		['slide4',false,[['link',.03,.56,.16,.19,startslide]]],

		//Number Digits
		['slide5',false,[['link',.07,.2,.18,.23,6],['link',.29,.2,.18,.23,7],['link',.52,.2,.18,.23,8],['link',.75,.2,.18,.23,9],
		['link',.07,.47,.18,.23,10],['link',.29,.47,.18,.23,11],['link',.52,.47,.18,.23,12],['link',.75,.47,.18,.23,13],['link',.88,.83,.1,.13,startslide]]],		
		['slide6',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide7',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide8',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide9',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide10',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide11',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide12',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide13',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],

		//Continuous Shapes
		['slide14',false,[['link',.07,.29,.18,.22,15],['link',.29,.29,.18,.22,16],['link',.52,.29,.18,.22,17],['link',.74,.29,.18,.22,18],
		['link',.88,.83,.1,.13,startslide]]],
		['slide15',false,[['link',.87,.85,.10,.10,14]]],
		['slide16',false,[['link',.87,.85,.10,.10,14]]],
		['slide17',false,[['link',.87,.85,.10,.10,14]]],
		['slide18',false,[['link',.87,.85,.10,.10,14]]],
		
		//Lines of Symmetry
		['slide19',false,[['link',.07,.2,.18,.23,20],['link',.29,.2,.18,.23,21],['link',.52,.2,.18,.23,22],['link',.75,.2,.18,.23,23],
		['link',.07,.47,.18,.23,24],['link',.29,.47,.18,.23,25],['link',.88,.83,.1,.13,startslide]]],
		['slide20',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
		['slide21',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
		['slide22',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
		['slide23',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
		['slide24',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
		['slide25',true,[['clear',0,.9,.10,.10,0],['pen',.1,.9,.10,.10,0],['eraser',.2,.9,.10,.10,0],['link',.87,.85,.10,.10,19]]],
	];
	
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
		img = document.getElementById(slides[curslide][0]);
		draw(img);
		
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
					//Change the slide if the button is a link, and signal mouseup to redraw it either way
					if(butType == 'link') {
						curslide = slides[curslide][2][i][5];
						img = document.getElementById(slides[curslide][0]);
						drawable = slides[curslide][1];
					} else if(butType == 'clear') {
						context2.clearRect(0,0,w,h);
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
		}, false);
		
		canvas2.addEventListener('mousemove', function(e) {
			//Draw lines following the mouse
			if(flag && drawable) {
				prevX = curX;
				prevY = curY;
				curX = e.pageX - canvas2.offsetLeft;
				curY = e.pageY - canvas2.offsetTop;
				if(pen) {
					drawLine(prevX,prevY,curX,curY);
					//drawLine(prevX+1,prevY+1,curX-1,curY-1);
					//drawLine(prevX-1,prevY-1,curX+1,curY+1);
				} else {
					context2.clearRect(curX-.025*w, curY-.025*h, .05*w, .05*h);
				}
				
			}
		}, false);
		
		canvas2.addEventListener('mouseup', function(e) {
			flag = false;
			draw(img);
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
		}, false);
		
		canvas2.addEventListener('mouseout', function(e) {
			flag = false;
		}, false);
	}
	
	function draw(image) {
		context1.clearRect(0, 0, canvas1.width, canvas1.height);
		context1.drawImage(image,0,0,canvas1.height*image.width/image.height, canvas1.height);
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
	
