
	

	var prevX = 0, prevY = 0, curX = 0, curY = 0;
	var butX = 0, butY = 0, butW = 0, butH = 0;
	var flag = false;
	var clearflag = false;
	var drawable = false;
	var curslide = 2;
	var img;
	var canvas;
	var context;
	var h=0,w=0;
	
	//Looks like a mess, but the structure is slide image id, whether you can draw on the slide, and a list of types and positions of buttons for each slide
	var slides = [
		['slide0',false,[]],
		['slide1',false,[]],

		//Main Menu
		['slide2',false,[['link',.04,.18,.4,.25,5],['link',.53,.2,.33,.3,14],['link',.02,.64,.29,.31,19]]],		
		['slide3',false,[]],
		['slide4',false,[]],

		//Number Digits
		['slide5',false,[['link',.07,.2,.18,.23,6],['link',.29,.2,.18,.23,7],['link',.52,.2,.18,.23,8],['link',.75,.2,.18,.23,9],
		['link',.07,.47,.18,.23,10],['link',.29,.47,.18,.23,11],['link',.52,.47,.18,.23,12],['link',.75,.47,.18,.23,13],['link',.88,.83,.1,.13,2]]],		
		['slide6',true,[['clear',0,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide7',true,[['clear',0,.90,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide8',true,[['clear',0,.90,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide9',true,[['clear',0,.90,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide10',true,[['clear',0,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide11',true,[['clear',0,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide12',true,[['clear',0,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],
		['slide13',true,[['clear',0,.9,.10,.10,0],['link',.87,.85,.10,.10,5]]],

		//Continuous Shapes
		['slide14',false,[['link',.07,.29,.18,.22,15],['link',.29,.29,.18,.22,16],['link',.52,.29,.18,.22,17],['link',.74,.29,.18,.22,18],
		['link',.88,.83,.1,.13,2]]],
		['slide15',false,[['link',.87,.85,.10,.10,14]]],
		['slide16',false,[['link',.87,.85,.10,.10,14]]],
		['slide17',false,[['link',.87,.85,.10,.10,14]]],
		['slide18',false,[['link',.87,.85,.10,.10,14]]],
		
		//Lines of Symmetry
		['slide19',true,[['link',.07,.2,.18,.23,20],['link',.29,.2,.18,.23,21],['link',.52,.2,.18,.23,22],['link',.75,.2,.18,.23,23],
		['link',.07,.47,.18,.23,24],['link',.29,.47,.18,.23,25],['link',.88,.83,.1,.13,2]]],
		['slide20',true,[['link',.87,.85,.10,.10,19]]],
		['slide21',true,[['link',.87,.85,.10,.10,19]]],
		['slide22',true,[['link',.87,.85,.10,.10,19]]],
		['slide23',true,[['link',.87,.85,.10,.10,19]]],
		['slide24',true,[['link',.87,.85,.10,.10,19]]],
		['slide25',true,[['link',.87,.85,.10,.10,19]]],
	];
	
	function init() {
		canvas = document.getElementById( 'canvas' );
		context  = canvas.getContext( "2d" );
		
		// Just innerwidth/innerheight makes a scroll bar appear, not sure if I am doing something wrong t:here
		context.canvas.width  = window.innerWidth - 25;
		context.canvas.height = window.innerHeight - 25;
		img = document.getElementById(slides[curslide][0]);
		draw(img);
		
		canvas.addEventListener('mousedown', function(e) {
			prevX = curX;
			prevY = curY;
			curX = e.pageX - canvas.offsetLeft;
			curY = e.pageY - canvas.offsetTop;
			h = canvas.height;
			w = canvas.height*img.width/img.height;
			
			var butX = 0, butY = 0, butW = 0, butH = 0;
			// Checking if the click is in a button's area
			for(i=0;i<slides[curslide][2].length;i++) {
				butX = slides[curslide][2][i][1];
				butY = slides[curslide][2][i][2];
				butW = slides[curslide][2][i][3];
				butH = slides[curslide][2][i][4];
				if (curX > butX*w && curX < (butX + butW)*w && curY > butY*h && curY < (butY + butH)*h) {
					context.globalAlpha=0.5;
					context.fillRect(butX*w,butY*h,butW*w,butH*h);
					context.globalAlpha=1;
					clearflag = true;
					if(slides[curslide][2][i][0] == 'link') {
						curslide = slides[curslide][2][i][5];
						img = document.getElementById(slides[curslide][0]);
						drawable = slides[curslide][1];
					}
					break;
				} else {
					flag = true;
				}
			}
		}, false);
		
		canvas.addEventListener('mousemove', function(e) {
			if(flag && drawable) {
				prevX = curX;
				prevY = curY;
				curX = e.pageX - canvas.offsetLeft;
				curY = e.pageY - canvas.offsetTop;
				drawLine(prevX,prevY,curX,curY);
				//(prevX+1,prevY+1,curX-1,curY-1);
				//drawLine(prevX-1,prevY-1,curX+1,curY+1);
			}
		}, false);
		
		canvas.addEventListener('mouseup', function(e) {
			flag = false;
			if(clearflag) {
				draw(img);
				clearflag = false;
				if(drawable) {
					context.drawImage(document.getElementById('erase'),0,.9*h,.1*w,.1*h);
				}

			}
		}, false);
		
		canvas.addEventListener('mouseout', function(e) {
			flag = false;
		}, false);
	}
	
	function draw(image) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(image,0,0,canvas.height*image.width/image.height, canvas.height);
	}
	
	function drawLine(x1,y1,x2,y2) {
				context.beginPath();
				context.moveTo(x1, y1);
				context.lineTo(x2, y2);
				context.lineWidth = 2;
				if(canvas.height*img.width/img.height - x2 >= 0 && canvas.height - y2 >= 0) {
					context.stroke();
				}
				context.closePath();
	}
	
