
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
	//var pos = [20, -20, 0];
	var pos = [ ];
	var newPos = [ ];
	var dest = [ ];
	var NUM_ELEMENTS = 10;
	for(var i = 0; i < NUM_ELEMENTS ; i++) {
		pos.push( [	-50 + Math.random() * 100,
		 			-50 + Math.random() * 100,
					Math.random() * 100 ]);
		
		newPos.push([0,0,0]);
		
		dest.push([0,0,0]);
	}
	console.log('length : ' + pos.length);
	var rotate = 0;
	
	renderer.prototype.update = function() {
		
		c.save();
		c.fillStyle = 'rgba(0,0,0,1)';

		c.fillRect(0,0,w,h);
		c.fillStyle = 'rgba(255,0,0,1)';
		
		var persp = mat4.create();
		mat4.perspective(65, w/h, 100, 200, persp );
		
		
		var matrixBuffer = mat4.create();
		mat4.set(rotateMatrix, matrixBuffer);
		
		mat4.translate(matrixBuffer, [0,0,100]);
		mat4.rotate(matrixBuffer, rotate * 0.02, [0,1,0]);
		mat4.rotate(matrixBuffer, rotate * 0.01, [1,0,0]);
		rotate++;
		
		
		//var pos = [-10 , 5, 10];
		
		
		
		// console.log(newPos[0]);
		// 		console.log(newPos[1]);
		// 		console.log(newPos[2]);
		// 		console.log('---------');
		//console.log(newPos[0]);
		
		
		//var modelViewPersp = mat4.create();
		//mat4.multiply(modelView, persp, modelViewPersp);
		//mat4.multiply(modelView, persp, modelViewPersp);
		//mat4.multiplyVec3(modelViewPersp, cameraPos, newPos); 
		
		//c.fillRect(newPos[0] + w/2, newPos[1] + h/2, 2, 2);
		for( var i = 0; i < NUM_ELEMENTS ; i++) {
			mat4.multiplyVec3(matrixBuffer, pos[i], newPos[i]);
			mat4.multiplyVec3(persp, newPos[i], dest[i]);
			c.fillRect(dest[i][0] + w/2, dest[i][1] + h/2, 2,2);
			//console.log('index : ' + (i*3) + " : " + dest[i*3]);
		}
		//console.log('---');
		//c.fillRect(dest[0] + w/2, dest[1] + h/2, 10,10);
		
		c.restore();
	};	
	
	return renderer;
})();






