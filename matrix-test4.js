
function initCanvas(canvas) {
	
	var render = new Renderer(canvas);

	(function animloop(){
	      render.update();
	      requestAnimFrame(animloop);
	})();
}


// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element){
            	window.setTimeout(callback, 1000 / 60);
            };
})();



	
window.Renderer = (function(){
	
	var isMouseDown = false,
		posX = 0,
		posY = 0;

	var renderer = function(canvas){
		this.canvas = canvas;
		c = canvas.getContext('2d');
		w = canvas.width;
		h = canvas.height;
		
		console.log('offsetLeft : ' + canvas.offsetLeft);
		if(!window) {
			return new Error('no window');
		}
		canvas.onmousemove = function(event) {
			if(isDragging) {
				posX = event.clientX - canvas.offsetLeft;
				console.log('posX : ' + posX);
			}else if(isMouseDown){
				mouseDownCount++;
				console.log('mouseDownCount : ' + mouseDownCount);
				if(mouseDownCount > 10) {
					isDragging = true;
				}
			}
		};
		window.onmousedown = function(event) {
			if(isAnimating) {
				stopAnimation();
			}else{
				//isMouseDown = isAnimating = true;
				isMouseDown = true;
				isDragging = false;
				isAnimating = false;
				mouseDownCount = 1;
				clickedX = event.clientX - canvas.offsetLeft;
				console.log('mouse down');
			}
		};
		window.onmouseup = function(event) {
			
			isMouseDown = false;
			isDragging = false;
			if(!mouseDownCount) {
				// animation is just stopped
				console.log('animation stop as well');
			}
			else if(isDragging) {
				isAnimating = false;
				dest = posX;
				console.log('dragging end');
			} else {
				isAnimating = true;
//				velocityX = 50;
				var dx = (event.clientX - canvas.offsetLeft) - clickedX;
				
				velocityX = dx * Math.pow((12 - mouseDownCount), 0.01) ;
 
				console.log('start animation! : mouseDownCount : ' + mouseDownCount);
			}	
			
		}
		
	};
	
	function stopAnimation(){
		isAnimating = false;
		//dest = posX;
		velocityX = 0;
		mouseDownCount = 0;
		console.log('animation stop');
	}
	//var dest = 0;
	var isDragging = false;
	var isAnimating = false;
	var mouseDownCount = 0;
	var clickedX = 0;
	var velocityX = 0;

	renderer.prototype.update = function() {
		
		
	
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';
		c.fillRect(0,0,w,h);
		
		c.fillStyle = 'rgba(255,0,0,1)';
		
		
		if(isAnimating) {
			//posX += velocityX;
			velocityX *= 0.9;
			posX += velocityX;
			
			if( (posX + 20) > w || posX < 0) {
				velocityX *= -1;
				posX += velocityX * 2;
			}

			if(Math.abs(velocityX) < 0.1 ) {
				stopAnimation();
			}
		}

		c.fillRect( posX, posY, 20, 20);
		c.restore();
	};	
	
	return renderer;
})();






