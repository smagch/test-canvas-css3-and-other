
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
	
	
	var rotateMatrix = mat4.create(),//rotate = 0,	
		/* context*/ c,	
		w,	h;
	
	mat4.identity(rotateMatrix);
			
	var renderer = function(canvas){
//		this.canvas = canvas;
		c = canvas.getContext('2d');
		w = canvas.width;
		h = canvas.height;
	};
	
	// var pos = [ -5 + 10 * Math.random(),
	// 	 			-5 + 10 * Math.random(),
	// 				10 * Math.random() ];
	var pos = [10, 30, 0];
	var rotate= 0;
	
	
	renderer.prototype.update = function() {
		var persp = mat4.create();
		mat4.perspective(65, w/h, 1, 100, persp );
		
		
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';

		c.fillRect(0,0,w,h);
		c.fillStyle = 'rgba(255,0,0,1)';
		
		
		
		var matrixBuffer = mat4.create();
		mat4.set(rotateMatrix, matrixBuffer);
		
		//mat4.rotate(rotateMatrix, 0.02, [0,1,0]);	
		mat4.translate(matrixBuffer, [0,0,100]);
		mat4.rotate(matrixBuffer, rotate, [1,0,0]);
		rotate += 0.01;
		
		//mat4.translate(matrixBuffer, [0,0,100]);
		//var pos = [-10 , 5, 10];
		var newPos = [0,0,0];
		mat4.multiplyVec3(matrixBuffer, pos, newPos);
		// console.log(newPos[0]);
		// 		console.log(newPos[1]);
		// 		console.log(newPos[2]);
		// 		console.log('---------');
		//console.log(newPos[0]);
		var dest = [0,0,0];
		mat4.multiplyVec3(persp, newPos, dest);
		//var modelViewPersp = mat4.create();
		//mat4.multiply(modelView, persp, modelViewPersp);
		//mat4.multiply(modelView, persp, modelViewPersp);
		//mat4.multiplyVec3(modelViewPersp, cameraPos, newPos); 
		
		//c.fillRect(newPos[0] + w/2, newPos[1] + h/2, 2, 2);
		c.fillRect(dest[0] + w/2, dest[1] + h/2, 10,10);
		console.log(dest[0]);
		total--;
		if(total < 0 ) {
			//throw new Error('ee');
		}
		c.restore();
	};
	var total = 20;
	
	
	
	
	return renderer;
})();






