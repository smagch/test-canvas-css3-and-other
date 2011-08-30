
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
	
	
	var rotate = 0,	
		/* context*/ c,	
		w,	h;
			
	var renderer = function(canvas){
//		this.canvas = canvas;
		c = canvas.getContext('2d');
		w = canvas.width;
		h = canvas.height;
	};
	
	renderer.prototype.update = function() {
		
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';

		c.fillRect(0,0,w,h);


		c.fillStyle = 'rgba(255,0,0,1)';
		
		var persp = mat4.create();
		mat4.perspective(45, 4/3, 1, 100, persp );

		var modelView = mat4.create();
		mat4.identity(modelView);
	
		mat4.translate(modelView, [100,50,-10]);
		rotate += 0.01;
		mat4.rotate(modelView, rotate, [0,1,0]);
		mat4.rotate(modelView, rotate*2, [0,0,1]);
		mat4.rotate(modelView, rotate*3, [1,0,0]);
		mat4.scale(modelView, [50,50,50]);

		//console.log(mat4.str(modelView));

		//var cameraPos = [w/2, h/2, -0];
		var cameraPos = [0, 0, 0];
		var newPos = [0, 0, 0];
	
		var modelViewPersp = mat4.create();
		mat4.multiply(modelView, persp, modelViewPersp);
	
		mat4.multiplyVec3(modelViewPersp, cameraPos, newPos); 
		c.fillRect(newPos[0] + w/2, newPos[1] + h/2, 10,10);

		c.restore();
	};
	
	
	
	
	return renderer;
})();






