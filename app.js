// WebGL canvas and rendering context.
var canvas, context;

// Shader program.
var program;

// An instance of our triangle.
var triangle;

function init()
{
	// Get the canvas.
	canvas = document.getElementById("gl_canvas");
	
	// Get the rendering context.
	context = canvas.getContext("experimental-webgl");
	
	// Set the buffer blanking color.
	context.clearColor(0.0, .8, .8, 1.0);
	
	// Enable some features.
	context.enable(context.DEPTH_TEST);
	
	// Create the shader program.
	program = createShaderProgram(context, "base-vert", "base-frag");
	// Set up attribute locations.
	program.vertPosAttribute = context.getAttribLocation(program, "vertPos");
	context.enableVertexAttribArray(program.vertPosAttribute);
	program.vertColorAttribute = context.getAttribLocation(program, "vertColor");
	context.enableVertexAttribArray(program.vertColorAttribute);
	// Store uniform location.
	context.getUniformLocation(program, "factor");
	
	
	// Create the triangle.
	triangle = new Triangle(context);
	
	// Register the rendering function as an interval.
	setInterval(function(){render();}, 1000/60);
}

function render()
{
	// Set the range of pixels that we will allow WebGL to use.
	context.viewport(0, 0, canvas.width, canvas.height);
	
	// Blank the screen.
	context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);
	
	// Render the triangle.
	triangle.render(context, program);
}