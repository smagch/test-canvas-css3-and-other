
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
	
	var NUM_ELEMENTS = 100,
		rotate = 0,
		persp = mat4.create(),
		/* context*/ c,	
		w,	h,
		pos = new glMatrixArrayType(),
		newPos = new glMatrixArrayType(),
		dest = new glMatrixArrayType();
		
	for(var i = 0 ; i < NUM_ELEMENTS ; i++) {
		pos[i] = vec3.create([	-50 + Math.random() * 100,
				 	-50 + Math.random() * 100,
					-50 + Math.random() * 100 ]);
		
		newPos[i] = vec3.create([0,0,0]);	
		dest[i] = vec3.create([0,0,0]);
	}
	

	var renderer = function(canvas){
//		this.canvas = canvas;
		c = canvas.getContext('2d');
		w = canvas.width;
		h = canvas.height;
		mat4.perspective(65, w/h, 100, 200, persp );
	};
	
	renderer.prototype.update = function() {
		
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';

		c.fillRect(0,0,w,h);
		c.fillStyle = 'rgba(255,0,0,1)';
		
		var matrixBuffer = mat4.create();
		mat4.identity(matrixBuffer);
		
		mat4.translate(matrixBuffer, [0,0,100]);
		mat4.rotate(matrixBuffer, rotate * 0.02, [0,1,0]);
		mat4.rotate(matrixBuffer, rotate * 0.01, [1,0,0]);
		rotate++;
		
		for( var i = 0; i < NUM_ELEMENTS ; i++) {
			mat4.multiplyVec3(matrixBuffer, pos[i], newPos[i]);
			mat4.multiplyVec3(persp, newPos[i], dest[i]);
			c.fillRect(dest[i][0] + w/2, dest[i][1] + h/2, 2,2);
		}
		
		
		c.restore();
	};	
	
	return renderer;
})();






