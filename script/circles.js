var Circles = function(args) {

	/**
	 *	Arguments are json data provided to modify internal working of the 
	 *	method.
	 */

	 if(typeof args == "undefined") args = {};

	 // No of circles used
	 var count = typeof args.count == "undefined" ? 100 : parseInt(args.count);

	 // Radius of the circle
	 var radius = typeof args.radius == "undefined" ? window.innerHeight : parseInt(args.radius);

	 // size of the individual circle
	 var size = typeof args.size == "undefined" ? 30 : parseInt(args.size);

	 // width of the canvas
	 var width = typeof args.width == "undefined" ? window.innerWidth : parseInt(args.width);

	 // Height of the canvas
	 var height = typeof args.height == "undefined" ? window.innerHeight : parseInt(args.height);

	 // Parent of the canvas
	 var parent = typeof args.parent == "undefined" ? "body" : parseInt(args.parent);

	 // Class assigned to the canvas element
	 var canvasClass = typeof args.class == "undefined" ? "" : (typeof args.class == "array" ? args.class.join(" ") : args.class);

	 // Background Color
	 var bgColor = "#111";

	 // Circle colors
	 var colors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#607D8B"];

	 // Sample text for unsupported browsers
	 var unsupportedBrowserText = "Sorry, Canvas is not supported by your browser. May I suggest using Google Chrome.";

	 // Canvas element to draw circles in
	 var canvas = document.createElement("canvas");
	 var context = canvas.getContext("2d");

	 // Array to hold all the circles
	 var circlesArray = new Array();

	 // Mouse positions
	 var position = { x:0, y:0 };

	 // Request Animation Frame 
	 var requestAnimationFrame = 	window.requestAnimationFrame || 
                            		window.mozRequestAnimationFrame ||
                            		window.webkitRequestAnimationFrame ||
                            		window.msRequestAnimationFrame;


      /**	
       *	Circle Object
       */
       function Circle(radius, speed, width, xPos, yPos) {
		  this.radius = radius;
		  this.speed = speed;
		  this.width = width;
		  this.xPos = xPos;
		  this.yPos = yPos;
		  this.color = Math.floor(Math.random() * (colors.length+1));
		  this.opacity = .05 + Math.random() * .5;
		 
		  this.counter = 0;
		  this.step = 5;
		 
		  var signHelper = Math.floor(Math.random() * 2);
		 
		  if (signHelper == 1) {
		    this.sign = -1;
		  } else {
		    this.sign = 1;
		  }
		}
		 
		Circle.prototype.update = function () {
		  this.counter += this.sign * this.speed;
		 
		  context.beginPath();
		    
		  context.arc(
		    this.xPos + Math.cos(this.counter / 100) * this.radius, 
		    this.yPos + Math.sin(this.counter / 100) * this.radius, 
		    this.width, 
		    0, 
		    Math.PI * 2,
		    false
		  );
		                             
		  context.closePath();
		 
		  //context.fillStyle = 'rgba(185, 211, 238,' + this.opacity + ')';
		  context.fillStyle = colors[this.color];
		  context.fill();
		};

		Circle.prototype.moveTo = function(pos) {
		  this.xPos = pos.x;
		  this.yPos = pos.y;
		}

	 /**
	  *	Initialization Method
	  */
	 var init = function() {
	 	canvas.className = canvasClass;
		canvas.width = width;
		canvas.height = height;
		canvas.innerHTML = unsupportedBrowserText;

		document.querySelector(parent).appendChild(canvas);

	 	context.fillStyle = bgColor;
	 	context.fillRect(0, 0, width, height);

	 	drawCircle();
	 	draw();
	 	trackMouse();
	 }


	 /**
	  *	Draw Method is responsible for drawing the canvas
	  */
	 var draw = function() {
	 	context.fillStyle = bgColor;
	 	context.fillRect(0, 0, width, height);
 
	 	for (var i = 0; i < circlesArray.length; i++) {
		  var myCircle = circlesArray[i];
		  myCircle.update();
		}
	  
	  requestAnimationFrame(draw);
	 }

	 /**
	  *	Move Method is responsible for moving to specific location
	  */
	 var move = function() {
	 	context.fillStyle = bgColor;
	 	context.fillRect(0, 0, width, height);
 
	 	for (var i = 0; i < circlesArray.length; i++) {
		  var myCircle = circlesArray[i];
		  myCircle.moveTo(position);
		}
	 }

	 /**
	  *
	  */
	 var drawCircle = function() {
	 	var x = Math.round(0 + Math.random() * width);
	 	for (var i = 0; i < count; i++) {
		    var speed = .2 + Math.random() * 3;
		    var Csize = 5 + Math.random() * radius;
		    var asize = 5 + Math.random() * size;
		 
		    var circle = new Circle(Csize, speed, asize, x, x);
		    circlesArray.push(circle);
		}
	 }

	 /**
	  *	Track Mouse Positions within the canvas
	  */
	 var trackMouse = function() {
	 	canvas.onmousemove = function(e){
		    position.x = e.clientX;
		    position.y = e.clientY;

		    move();
		}
	 }

	 /**
	  *	Calling All the methods
	  */

	 init();
}