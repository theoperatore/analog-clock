/* This class holds information about a 2D Rotational Matrix and supports 
 * operations performed on them
 */
 
var Matrix2D = function(theta) {
	
	if (typeof theta === 'number') {
		
		this.in1   = Math.cos(theta * (Math.PI / 180));
		this.in2   = Math.sin(theta * (Math.PI / 180));
		this.in3   = -this.in2;
		this.in4   = this.in1; 
	}
	else {
		console.log('Invalid Theta Given as: ' + theta);
	}
}

Matrix2D.prototype.rotate = function(v) {
	var new_x = v.x*this.in1 + v.y*this.in3;
	var new_y = v.x*this.in2 + v.y*this.in4;

	return new Vector2D(new_x,new_y);
};