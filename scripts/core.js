function init() {
	
	//get our canvas and drawing context
	var canvas = document.getElementById('playground');
	var ctx    = canvas.getContext('2d');

	//center of clock 2
	var c2    = new Vector2D(300,100),
		hour2 = new Vector2D(0,-40),
		min2  = new Vector2D(0,-65);

	//42 degs for 12:07; 7 mins = 42 degs
	var rot = new Matrix2D(42);

	//center of clock 1
	var c1    = new Vector2D(100,100),
		hour1 = new Vector2D(c1.x,c2.y - 40),
		min1  = new Vector2D(0,-65);

		//take care of the rotation of the first clock right away
		min1 = rot.rotate(min1);


	var lastmin = 0,
		lasthr  = 0;
	//main update method
	var update = function(elapsedTime) {
		
		//get the current time
		var curr = new Date();

		//get the current minutes and hours
		var numMins = curr.getMinutes(),
			numHrs  = curr.getHours();

		//if the minutes have changed...
		if (lastmin != numMins) {

			//get the new angle to draw and create that matrix
			var angle = numMins * 6;
			var rotateMin = new Matrix2D(angle);

			//reset the initial vector to rotate
			min2.x = 0;
			min2.y = -65;

			//rotate the vector
			min2 = rotateMin.rotate(min2);

			//mark that we updated for this minute
			lastmin = numMins;
		}


		//same idea as minutes but for hours.
		if (lasthr != numHrs) {

			//get the new angle to draw and create that matrix
			var angle    = (numHrs * 30) + (numMins / 2);
			var rotateHr = new Matrix2D(angle);

			//reset the inital vector to rotate
			hour2.x = 0;
			hour2.y = -40;

			//rotate the vector
			hour2 = rotateHr.rotate(hour2);
			lasthr = numHrs; 
		}




	}
	
	//main drawing method
	var draw = function() {
		ctx.clearRect(0,0,400,200);

		//////////////////////// draw clock 1 time marks //////////////////////////

		//draw clock1
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(c1.x, c1.y, 80, 0, 2 * Math.PI, false);
		ctx.fill();

		//mark top
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c1.x, c1.y - 80);
		ctx.lineTo(c1.x, c1.y - 80 + 25);
		ctx.stroke();

		//mark right
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c1.x + 80, c1.y);
		ctx.lineTo(c1.x + 80 - 25, c1.y);
		ctx.stroke();

		//mark bottom
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c1.x, c1.y + 80);
		ctx.lineTo(c1.x, c1.y + 80 - 25);
		ctx.stroke();

		//mark left
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c1.x - 80, c1.y);
		ctx.lineTo(c1.x - 80 + 25, c1.y);
		ctx.stroke();

		//////////////////////// draw clock 2 time marks //////////////////////////

		//draw clock2
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.arc(c2.x, c2.y, 80, 0, 2 * Math.PI, false);
		ctx.fill();

		//mark top
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c2.x, c2.y - 80);
		ctx.lineTo(c2.x, c2.y - 80 + 25);
		ctx.stroke();

		//mark right
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c2.x + 80, c2.y);
		ctx.lineTo(c2.x + 80 - 25, c2.y);
		ctx.stroke();

		//mark bottom
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c2.x, c2.y + 80);
		ctx.lineTo(c2.x, c2.y + 80 - 25);
		ctx.stroke();

		//mark left
		ctx.beginPath();
		ctx.lineWidth = 5;
		ctx.moveTo(c2.x - 80, c2.y);
		ctx.lineTo(c2.x - 80 + 25, c2.y);
		ctx.stroke();

		///////////////////////////// Clock 1 12:07 time hands //////////////////////
		
		//hour hand 1
		ctx.beginPath(); 
		ctx.moveTo(c1.x, c1.y);
		ctx.lineWidth = 8;
		ctx.lineTo(hour1.x, hour1.y);
		ctx.stroke();

		//min hand 1
		ctx.beginPath();
		ctx.moveTo(c1.x, c1.y);
		ctx.lineWidth = 4;
		ctx.lineTo(min1.x + c1.x, min1.y + c1.y);
		ctx.stroke();

		///////////////////////////// Clock 2 Hands ///////////////////////////////


		//hour hand 2
		ctx.beginPath(); 
		ctx.moveTo(c2.x, c2.y);
		ctx.lineWidth = 8;
		ctx.lineTo(hour2.x + c2.x, hour2.y + c2.y);
		ctx.stroke();

		//min hand 2
		ctx.beginPath();
		ctx.moveTo(c2.x, c2.y);
		ctx.lineWidth = 4;
		ctx.lineTo(min2.x + c2.x, min2.y + c2.y);
		ctx.stroke();

		//////////////////////////// draw small circle in center ////////////////////

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(c1.x, c1.y, 5, 0, 2 * Math.PI, false);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "black";
		ctx.arc(c2.x, c2.y, 5, 0, 2 * Math.PI, false);
		ctx.fill();		

	}
	
	//main loop variables
	var currTime = +new Date();
	var dTime    = 0;
	
	//main gameloop
	var loop = function() {
		var time     = +new Date();
		dTime        = time - currTime;
		currTime += dTime;
		
		update(dTime);
		draw();
	}
	
	//execute!
	var GO = setInterval(loop, 1000 / 120);
};