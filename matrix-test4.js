
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
		posY = 0,
		x = 0;

	var renderer = function(canvas){
		this.canvas = canvas;
		c = canvas.getContext('2d');
		w = canvas.width;
		h = canvas.height;
		x = canvas.offsetLeft;
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
				dest += 300;
				if(dest > w) dest -= w;
				console.log('start animation!');
			}	
			
		}
		
	};
	
	function stopAnimation(){
		isAnimating = false;
		dest = posX;
		mouseDownCount = 0;
		console.log('animation stop');
	}
	var dest = 500;
	var isDragging = false;
	var isAnimating = false;
	var mouseDownCount = 0;

	renderer.prototype.update = function() {
		// Drag or flip counting
		
	
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';
		c.fillRect(0,0,w,h);
		
		c.fillStyle = 'rgba(255,0,0,1)';
		
		
		if(isAnimating) {
			posX += (dest - posX) * 0.03;
			if( posX > w )  posX -= w;
			if(Math.abs(dest - posX) < 0.1 ) {
				stopAnimation();
			}
		}
		
		if( posX > w )  posX -= w;
		
		c.fillRect( posX, posY, 40, 40);
		c.restore();
	};	
	
	return renderer;
})();






