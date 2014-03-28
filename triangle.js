function Triangle(glContext)
{	
	// Vertex position data.
	var posData = [0.0, 0.0, 0.0, 
					1.0, 0.0, 0.0,
					.5, 1.0, 0.0];
	// Vertex color data.
	var colorData = [ 1.0, 0.0, 0.0, 1.0,
					0.0, 1.0, 0.0, 1.0,
					0.0, 0.0, 1.0, 1.0];
						
	// Create GPU side vertex buffer objects.
	this.posVBO = glContext.createBuffer();
	this.posVBO.itemSize = 3;
	this.posVBO.items = 3;
	this.colorVBO = glContext.createBuffer();
	this.colorVBO.itemSize = 4;
	this.colorVBO.items = 3;
	
	// Bind to each buffer and feed each their respective data.
	glContext.bindBuffer(glContext.ARRAY_BUFFER, this.posVBO);
	glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(posData), glContext.STATIC_DRAW);
	
	glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorVBO);
	glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(colorData), glContext.STATIC_DRAW);
}

Triangle.prototype.render = function(glContext, shaderProgram)
{
	// Specify the given shader program to the OpenGL state for use.
	glContext.useProgram(shaderProgram);
	
	// Feed in our uniform data.
	var seconds = new Date().getTime()/5.0;
	var location = glContext.getUniformLocation(shaderProgram, "factor");
	glContext.uniform1f(location, seconds);
	
	// Bind to the position buffer.
	glContext.bindBuffer(glContext.ARRAY_BUFFER, this.posVBO);
	
	// Link the vbo to the appropriate attribute of the shader object.
	glContext.vertexAttribPointer(shaderProgram.vertPosAttribute, this.posVBO.itemSize, glContext.FLOAT, false, 0, 0);
	
	// Repeat, reuse, repost.
	glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorVBO);
	glContext.vertexAttribPointer(shaderProgram.vertColorAttribute, this.colorVBO.itemSize, glContext.FLOAT, false, 0, 0);
	
	// Tell OpenGL to use all the stuffs to shove the vbos through the shader pipeline.
	glContext.drawArrays(glContext.TRIANGLES, 0, this.posVBO.items);
	
	glContext.useProgram(null);
}


	