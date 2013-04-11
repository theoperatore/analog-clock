var Vector2D = function(x,y) {
	this.x = x;
	this.y = y;
}

Vector2D.prototype.add = function(v) {
	var new_x = this.x + v.x;
	var new_y = this.y + v.y;

	return new Vector2D(new_x, new_y);
};

Vector2D.prototype.scalar = function(scalar) {
	this.x *= scalar;
	this.y *= scalar;
};

Vector2D.prototype.mag = function() {
	var x2 = this.x*this.x;
	var y2 = this.y*this.y;

	return Math.sqrt(x2 + y2);
};

Vector2D.prototype.normalize = function() {
	var mag   = this.mag();
	var new_x = this.x / mag;
	var new_y = this.y / mag;

	return new Vector2D(new_x, new_x);
};